import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function IntroductionSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giới thiệu</Text>
      <Text style={styles.subtitle}>Đa dạng sân cho nhiều môn thể thao</Text>
      <Text style={styles.description}>
        Chào mừng đến với hệ thống sân đa năng tại trung tâm thể dục thể thao
        của chúng tôi. Chúng tôi tự hào cung cấp một loạt các sân chơi phù hợp
        cho nhiều môn thể thao khác nhau, từ bóng đá, bóng rổ, bóng chuyền cho
        đến quần vợt và các hoạt động thể dục khác.
      </Text>
      <Text style={styles.description}>
        Với các cơ sở vật chất hiện đại và không gian mở rộng, bạn sẽ có được
        môi trường lý tưởng để rèn luyện sức khỏe và nâng cao kỹ năng cho môn
        thể thao yêu thích của mình.
      </Text>
      <Text style={styles.description}>
        Hãy tham gia cùng chúng tôi và trải nghiệm những giờ phút sôi động và
        đầy hứng khởi với các hoạt động thể thao tại địa điểm này.
      </Text>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    color: "#707070",
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
  },
  description: {
    color: "#707070",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "justify",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#707070",
    marginVertical: 20,
  },
});

export default IntroductionSection;
