import s from "./style.module.scss";

import cx from "classnames";

const defects = [
	"недоэкструзия",
	"переэкструзия",
	"отлипание",
	"расслоение",
	"спагетти",
];

export const Sort = () => {
	const url = `https://loremflickr.com/500/500?random=${(38)
		/* Math.random() * 100 */
		.toFixed(0)}`;

	return (
		<section className={s.page}>
			<div className={s.viewer}>
				<div
					className={s.viewer_bg}
					style={{
						backgroundImage: `url('${url}')`,
					}}></div>
				<div className={s.viewer_image}>
					<img
						src={url}
						alt=''
					/>
				</div>
			</div>

			<div className={s.actions}>
				<div className={s.card}>
					<p className={s.title}>Выбор дефекта(-ов)</p>
					<div className={cx(s.content, s.defects)}>
						{defects.map((el) => (
							<label
								key={el}
								htmlFor={el}
								className={s.type_input}>
								<input
									type='checkbox'
									name={el}
									id={el}
								/>
								{el}
							</label>
						))}
					</div>
					<button className={cx(s.button)}>Подтвердить</button>
				</div>

				{/* <div className={cx(s.card)}>
					<p className={s.title}>Инфо изображения</p>
					<div className={s.content}></div>
				</div> */}

				<button className={cx(s.button)}>Пропустить снимок</button>
			</div>
		</section>
	);
};
