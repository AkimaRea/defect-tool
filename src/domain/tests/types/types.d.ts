type TestSchema = {
  uid: string;
  photo_url: string;
};

type ProcessTestSchema = {
  uid: string; // UID теста
  target: string;
  userUid: string; // UID пользователя
}