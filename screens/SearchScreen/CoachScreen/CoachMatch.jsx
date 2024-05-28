import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { styles } from "../../../component/style";

export default function CoachMatch() {
  const [haveMatch, setHaveMatch] = useState(false);
  return (
    <View style={[styles.centerStyle, { marginTop: 20 }]}>
      {haveMatch ? (
        <></>
      ) : (
        <>
          <View style={styles.logoRankContainer}>
            <Image
              source={require("./../../../assets/rank.png")}
              style={styles.imageStyle}
            />
          </View>
          <View>
            <Text style={styles.textRank}>Không có bất kì trận đấu nào</Text>
            <Text
              style={{
                paddingHorizontal: 70,
                textAlign: "center",
                fontSize: 16,
                marginVertical: 10,
              }}
            >
              Nếu bạn có bất kì trận đấu nào, xin hãy liên hệ với người tôt chức
              hoạt động để ghi lại các trận đấu và lưu lại số liệu thống kê
            </Text>
          </View>
        </>
      )}
    </View>
  );
}
