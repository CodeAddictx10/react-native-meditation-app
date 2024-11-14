import { Text, View } from "react-native";
import { Meditation } from "@/types";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function MeditationListItem({
    meditation,
}: {
    meditation: Meditation;
}) {
    return (
        <View className="flex-row items-center gap-5">
            <View className="bg-green-700 p-2 rounded-full">
                <FontAwesome name="check" size={16} color="white" />
            </View>
            <View className="flex-1 px-5 py-8 border-2 border-gray-300 rounded-2xl gap-y-4">
                <Text className="font-semibold text-2xl">
                    {meditation.title}
                </Text>
                <View className="flex-row items-center gap-1">
                    <FontAwesome6 name="clock" size={16} color="#6B7280" />
                    <Text className="text-grey-500">{meditation.duration}</Text>
                </View>
            </View>
        </View>
    );
}
