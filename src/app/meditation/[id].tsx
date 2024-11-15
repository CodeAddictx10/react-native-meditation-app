import { meditations } from "@/data";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";

import audio from "@assets/meditations/audio1.mp3";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import AnimatedBackground from "@/components/AnimatedBackground";

const formatMillisecond = (milli: number) => {
    const minutes = Math.floor(milli / 60000);
    const seconds = Math.floor((milli % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function MeditationDetails() {
    const { id } = useLocalSearchParams();
    const player = useAudioPlayer(audio);
    const player_status = useAudioPlayerStatus(player);
    // const { top,  right } = useSafeAreaInsets();

    const meditation = meditations.find((item) => item.id === +id);

    if (!meditation) {
        return <Text>Meditation not found!!!</Text>;
    }

    return (
        <SafeAreaView className="bg-orange-400 flex-1">
            <AnimatedBackground />
            <View className="flex-1">
                <View className="flex-1">
                    {/* Header */}
                    <View className="flex-row items-center justify-between p-10">
                        <AntDesign name="infocirlceo" size={24} color="black" />
                        <View className="bg-zinc-800 p-2 rounded-md">
                            <Text className="text-zinc-100 font-semibold">
                                Today's meditation
                            </Text>
                        </View>
                        <AntDesign
                            onPress={() => router.back()}
                            name="close"
                            size={24}
                            color="black"
                        />
                    </View>
                    <Text className="text-3xl text-center font-semibold px-2">
                        {meditation.title}
                    </Text>
                </View>
                {/* Play/Pause Button */}
                <Pressable
                    onPress={() =>
                        player.playing ? player.pause() : player.play()
                    }
                    className="bg-zinc-800 self-center w-24 aspect-square rounded-full items-center justify-center">
                    <FontAwesome6
                        name={player_status.playing ? "pause" : "play"}
                        size={24}
                        color="snow"
                    />
                </Pressable>

                {/* Footer: Player */}
                <View className="flex-1">
                    <View className="p-5 mt-auto">
                        <View className="flex-row justify-between">
                            <MaterialIcons
                                name="airplay"
                                size={24}
                                color="#3A3937"
                            />
                            <MaterialCommunityIcons
                                name="cog-outline"
                                size={24}
                                color="#3A3937"
                            />
                        </View>
                        <Slider
                            style={{ width: "100%", height: 48 }}
                            minimumValue={0}
                            maximumValue={1}
                            value={
                                player_status.currentTime /
                                player_status.duration
                            }
                            minimumTrackTintColor="#3A3937"
                            maximumTrackTintColor="#3A393755"
                            thumbTintColor="#3A3937"
                            onSlidingComplete={(value) =>
                                player.seekTo(value * player_status.duration)
                            }
                        />
                        <View className="flex-row justify-between">
                            <Text>
                                {formatMillisecond(player_status.currentTime)}
                            </Text>
                            <Text>
                                {formatMillisecond(player_status.duration)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
