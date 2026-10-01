import { NextResponse } from "next/server";
import { EventName, Paddle } from "@paddle/paddle-node-sdk";
import { prisma } from "@/lib/prisma";

const paddle = new Paddle(process.env.PADDLE_API_KEY!);

export async function POST(request: Request) {
  const signature = request.headers.get("paddle-signature");
  const rawBody = await request.text();

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Paddle signature" },
      { status: 400 },
    );
  }

  const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("PADDLE_WEBHOOK_SECRET is not configured");

    return NextResponse.json(
      { error: "Webhook secret is not configured" },
      { status: 500 },
    );
  }

  let eventData;

  try {
    eventData = await paddle.webhooks.unmarshal(
      rawBody,
      webhookSecret,
      signature,
    );
  } catch (error) {
    console.error("Paddle webhook signature verification failed:", error);

    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 },
    );
  }

  try {
    // Prevent duplicate processing.
    const existingEvent = await prisma.paddleWebhookEvent.findUnique({
      where: {
        eventId: eventData.eventId,
      },
    });

    if (existingEvent) {
      return NextResponse.json({ received: true });
    }

    switch (eventData.eventType) {
      case EventName.SubscriptionCreated:
      case EventName.SubscriptionUpdated:
      case EventName.SubscriptionActivated:
      case EventName.SubscriptionCanceled:
      case EventName.SubscriptionPastDue:
      case EventName.SubscriptionPaused:
      case EventName.SubscriptionResumed:
      case EventName.SubscriptionTrialing: {
        const subscription = eventData.data;

        const customData = subscription.customData as {
          userId?: string;
        } | null;

        const userId = customData?.userId;

        if (!userId) {
          console.error(
            "Paddle subscription is missing custom_data.userId",
            subscription.id,
          );

          break;
        }

        const item = subscription.items?.[0];
        const price = item?.price;

        if (!price?.id || !price.productId) {
          console.error(
            "Paddle subscription is missing price/product information",
            subscription.id,
          );

          break;
        }

        await prisma.subscription.upsert({
          where: {
            provider_providerSubscriptionId: {
              provider: "PADDLE",
              providerSubscriptionId: subscription.id,
            },
          },
          create: {
            userId,
            provider: "PADDLE",
            providerCustomerId: subscription.customerId,
            providerSubscriptionId: subscription.id,
            providerProductId: price.productId,
            providerPriceId: price.id,
            status: subscription.status,
            currentPeriodStart: subscription.currentBillingPeriod
              ? new Date(subscription.currentBillingPeriod.startsAt)
              : null,
            currentPeriodEnd: subscription.currentBillingPeriod
              ? new Date(subscription.currentBillingPeriod.endsAt)
              : null,
            cancelAtPeriodEnd:
              subscription.scheduledChange?.action === "cancel",
          },
          update: {
            userId,
            providerCustomerId: subscription.customerId,
            providerProductId: price.productId,
            providerPriceId: price.id,
            status: subscription.status,
            currentPeriodStart: subscription.currentBillingPeriod
              ? new Date(subscription.currentBillingPeriod.startsAt)
              : null,
            currentPeriodEnd: subscription.currentBillingPeriod
              ? new Date(subscription.currentBillingPeriod.endsAt)
              : null,
            cancelAtPeriodEnd:
              subscription.scheduledChange?.action === "cancel",
          },
        });

        break;
      }

      default:
        break;
    }

    await prisma.paddleWebhookEvent.create({
      data: {
        eventId: eventData.eventId,
        eventType: eventData.eventType,
        occurredAt: new Date(eventData.occurredAt),
      },
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Paddle webhook processing failed:", error);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
