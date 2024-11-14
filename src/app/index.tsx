import MeditationListItem from "@/components/MeditationListItem";
import { meditations } from "@/data";
import { FlatList } from "react-native";

export default function HomeScreen() {
    return (
        <FlatList
            data={meditations}
            contentContainerClassName="gap-5 p-3"
            className="bg-white"
            renderItem={({ item }) => <MeditationListItem meditation={item} />}
        />
    );
}
