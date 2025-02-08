import { useEffect, useState } from "react";
import s from "./style.module.scss";

import cx from "classnames";
import { useAction, useAtom } from "@reatom/npm-react";
import {
  getTestAsync,
  processTestAsync,
  testAtom,
  testsNames,
} from "@/domain/tests";
import { toast } from "react-toastify";

export const Sort = () => {
  /*  const url = `https://loremflickr.com/500/500?random=${(38)
    .toFixed(0)}`; */
  const [chosen, setChosen] = useState<Set<string>>(new Set());
  const [test] = useAtom(testAtom);
  const getTest = useAction(getTestAsync);
  const processTest = useAction(processTestAsync);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const id = e.target.id;
    if (!chosen.has(id)) {
      chosen.add(id);
    } else {
      chosen.delete(id);
    }
    setChosen(new Set(chosen));
  };

  const handleSubmit = () => {
    if (chosen.size) {
      processTest({ uid: test.uid, target: Array.from(chosen).join(",") });
      setChosen(new Set());
    } else {
      toast.error("Выберите дефекты!");
    }
  };

  const handleSkip = () => {
    getTest();
  };

  useEffect(() => {
    console.log(chosen);
  }, [chosen]);

  const handleFullscreenMode = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <section className={s.page}>
      <button className={s.fullscreen} onClick={handleFullscreenMode}>
        <img src={import.meta.env.BASE_URL + "/fullscreen.svg"} alt="" />
      </button>

      <div className={s.viewer}>
        <div
          className={s.viewer_bg}
          style={{
            backgroundImage: `url('${
              import.meta.env.VITE_API_URL + test.photo_url
            }')`,
          }}
        ></div>
        <div className={s.viewer_image}>
          <img src={import.meta.env.VITE_API_URL + test.photo_url} alt="" />
        </div>
      </div>

      <div className={s.actions}>
        <div className={s.card}>
          <p className={s.title}>Выбор дефекта(-ов)</p>
          <div className={cx(s.content, s.defects)}>
            {testsNames.map((el, i) => (
              <label key={el} htmlFor={i.toString()} className={s.type_input}>
                <input
                  type="checkbox"
                  name={el}
                  id={i.toString()}
                  checked={Boolean(chosen.has(i.toString()))}
                  onChange={handleChange}
                />
                {el}
              </label>
            ))}
          </div>
          <button
            className={cx(s.button)}
            disabled={chosen.size === 0}
            onClick={handleSubmit}
          >
            Подтвердить
          </button>
        </div>

        {/* <div className={cx(s.card)}>
					<p className={s.title}>Инфо изображения</p>
					<div className={s.content}></div>
				</div> */}

        <button className={cx(s.button)} onClick={handleSkip}>
          Пропустить снимок
        </button>
      </div>
    </section>
  );
};
