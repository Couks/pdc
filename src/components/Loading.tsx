import React from "react";
import { ActivityIndicator } from "react-native";

export default function Loading() {
    return (
        <ActivityIndicator size="large" className="rounded-full flex-1 bg-green-500 items-center justify-center text-purple-400" />
    )
}