import usePostFeedback from '@/hooks/usePostFeedback';
import { Modal, View, Text, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

type FeedbackModalProps = {
	id: string;
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const FeedbackModal = ({ id, modalVisible, setModalVisible }: FeedbackModalProps) => {
	const { loading, postFeedback } = usePostFeedback();

	const postNegativeReview = async () => {
		await postFeedback({
			feedback: "yes",
			id
		});
	}

	const postPositiveReview = async () => {
		await postFeedback({
			feedback: "no",
			id
		});
	}

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => setModalVisible(false)}
		>
			<View className="flex-1 justify-center items-center bg-black/70">
				<View className="relative bg-zinc-800 p-6 rounded-2xl w-4/5 shadow-md">

					<Pressable
						className="absolute top-2 right-2"
						onPress={() => setModalVisible(false)}
					>

						<Feather name="x" size={18} color="#ffffff" />
					</Pressable>

					<Text className="text-white text-lg font-semibold mb-4">
						Is this video a Deepfake?
					</Text>

					<View className="flex-row justify-between">
						<Pressable
							className="bg-red-500 px-5 py-2 rounded-lg"
							onPress={() => {
								postNegativeReview();
								setModalVisible(false);
							}}
							disabled={loading}
						>
							<Text className="text-white font-semibold">Yes</Text>
						</Pressable>

						<Pressable
							className="bg-green-500 px-5 py-2 rounded-lg"
							onPress={() => {
								postPositiveReview();
								setModalVisible(false);
							}}
							disabled={loading}
						>
							<Text className="text-white font-semibold">No</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default FeedbackModal;