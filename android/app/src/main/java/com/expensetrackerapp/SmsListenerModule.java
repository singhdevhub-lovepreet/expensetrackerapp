package com.expensetrackerapp;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.telephony.SmsMessage;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

public class SmsListenerModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public SmsListenerModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;

        registerSMSReceiver();
    }

    @Override
    public String getName() {
        return "SmsListenerModule";
    }

    private void sendEvent(String eventName, String message) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, message);
    }

    private void registerSMSReceiver() {
        BroadcastReceiver smsReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                Bundle extras = intent.getExtras();
                if (extras != null) {
                    Object[] pdus = (Object[]) extras.get("pdus");
                    for (Object pdu : pdus) {
                        SmsMessage sms = SmsMessage.createFromPdu((byte[]) pdu);
                        String messageBody = sms.getMessageBody();
                        String senderPhoneNumber = sms.getOriginatingAddress();
                        long timestamp = sms.getTimestampMillis();

                        WritableMap params = Arguments.createMap();
                        params.putString("messageBody", messageBody);
                        params.putString("senderPhoneNumber", senderPhoneNumber);
                        params.putDouble("timestamp", (double) timestamp);

                        String jsonString = params.toString();

                        sendEvent("onSMSReceived", jsonString);
                    }
                }
            }
        };

        IntentFilter filter = new IntentFilter("android.provider.Telephony.SMS_RECEIVED");
        this.reactContext.registerReceiver(smsReceiver, filter);
    }

    @ReactMethod
    public void startListeningToSMS() {
        registerSMSReceiver();
    }
}