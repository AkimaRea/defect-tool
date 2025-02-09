import { instance } from "@/shared/api/instance";
import { atom, onConnect, reatomAsync } from "@reatom/framework";
import { toast } from "react-toastify";

export const testsNames = [
  "Нет дефекта", // Класс 0
  "Недоэкструзия", // Класс 1
  "Переэкструзия", // Класс 2
  "Сопли", // Класс 3
  "Отлипание", // Класс 4
  "Пузыри", // Класс 5
  "Расслоение", // Класс 6
  "Волнистость", // Класс 7
];

const RejectedCallback = (_: any, err: any) => {
  toast.error("Произошла ошибка, пропустите изображение или повторите позже!")
  console.error(err)
}

export const testAtom = atom<TestSchema>({} as TestSchema, "testAtom");

export const getTestAsync = reatomAsync(
  async (ctx) => ctx.schedule(() => instance.get<TestSchema>("/get-test")),
  {
    name: "getTestAsync",
    onFulfill: (ctx, res) => {
      testAtom(ctx, res.data);
    },
    onReject: RejectedCallback,
  }
);
onConnect(testAtom, getTestAsync);

export const processTestAsync = reatomAsync(
  async (ctx, payload: ProcessTestSchema) => {
    const formData = new FormData();
    formData.append("uid", payload.uid);
    formData.append("target", payload.target);
    formData.append("userUid", payload.userUid); // Добавляем UID пользователя
    return ctx.schedule(() => instance.post("/process-test", formData));
  },
  {
    name: "processTestAsync",
    onFulfill: (ctx) => {
      getTestAsync(ctx);
    },
    onReject: RejectedCallback,
  }
);

