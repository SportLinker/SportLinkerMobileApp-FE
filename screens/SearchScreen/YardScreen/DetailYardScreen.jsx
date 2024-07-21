import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RatingModal from "./RatingModal";
import { Snackbar } from "react-native-paper";
import { screenHeight, screenWidth } from "../../../component/style";
import Loading from "../../../component/Loading";
import {
  getLoadingSelector,
  getStadiumDetailByUserSelector,
} from "../../../redux/selectors";
import { getDetailStadiumByUser } from "../../../redux/slices/yardSlice";
import { ActionButtons } from "./Section/ActionButtons";
import { HeaderSection } from "./Section/HeaderSection";
import { IntroductionSection } from "./Section/IntroductionSection";
import { DetailsSection } from "./Section/DetailsSection";

const DetailYardScreen = ({ route }) => {
  const { stadium, latitude, longitude } = route?.params;

  const dispatch = useDispatch();
  const stadiumDetailById = useSelector(getStadiumDetailByUserSelector);
  const loading = useSelector(getLoadingSelector);

  const [image, setImage] = useState(
    "https://i.pinimg.com/236x/71/db/24/71db24f6798f1a208b7fe8a503365458.jpg"
  );
  const [liked, setLiked] = useState("");
  const [stadiumOwner, setStadiumOwner] = useState(stadium.owner);
  const [modalVisible, setModalVisible] = useState(false);
  const [stadiumDetail, setStadiumDetail] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");

  useEffect(() => {
    dispatch(getDetailStadiumByUser(stadium.id));
  }, [dispatch, stadium.id]);

  useEffect(() => {
    if (stadiumDetailById) {
      setStadiumDetail(stadiumDetailById);
    }
  }, [stadiumDetailById]);

  const handleRating = () => {
    if (stadiumDetail && stadiumDetail.can_rating) {
      setMessageSnackbar("Bạn đã đánh giá sân này!");
      setSnackbarVisible(true);
    }
    setModalVisible(true);
  };

  if (!stadiumDetail) return <Loading visible={loading} />;
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <HeaderSection
        image={image}
        stadium={stadiumDetail}
        stadiumOwner={stadiumOwner}
      />
      <ActionButtons
        handleRating={handleRating}
        liked={liked}
        setLiked={setLiked}
        stadium={stadium}
      />
      <IntroductionSection stadium={stadiumDetail} />
      <DetailsSection stadium={stadiumDetail} />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbarContainer}
      >
        {messageSnackbar}
      </Snackbar>
      {stadiumDetail && !stadiumDetail.can_rating && (
        <RatingModal
          stadium={stadiumDetail}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          longitude={longitude}
          latitude={latitude}
          setMessageSnackbar={setMessageSnackbar}
          setSnackbarVisible={setSnackbarVisible}
        />
      )}
    </SafeAreaView>
  );
};

export default DetailYardScreen;

const styles = StyleSheet.create({
  snackbarContainer: {
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#1646A9",
    textAlign: "center",
    transform: [
      { translateX: 0 * screenWidth },
      { translateY: -0.02 * screenHeight },
    ],
    color: "white",
  },
});
