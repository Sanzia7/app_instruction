import { useState } from 'react'
import data from './data.json'
import styles from './app.module.css'

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps] = useState(data)
	const [activeIndex, setActiveIndex] = useState(0)

	// И определить 3 обработчика:
	// Клик вперед:
	const handleNext = () => {
		setActiveIndex((prev) => prev + 1)
	}

	//Клик назад:
	const handleBack = () => {
		if (activeIndex > 0) {
			setActiveIndex((prev) => prev - 1)
		}
	}

	//Начать сначала:
	const handleReset = () => {
		setActiveIndex(0)
	}

	// И 2 переменных-флага:
	//находимся ли мы на первом шаге:
	const isFirstStep = activeIndex === 0
	//и находимся ли на последнем:
	const isLastStep = activeIndex === steps.length - 1

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map(({ title, id }, index) => (
							<li
								key={id}
								className={styles['steps-item']
									+ (index === activeIndex ? ` ${styles.active}` : '')
									+ (index < activeIndex ? ` ${styles.done}` : '')}
							>
								<button
									className={styles['steps-item-button']}
									onClick={() => setActiveIndex(index)}
								>
									{index + 1}
								</button>{' '}
								{title}
							</li>
						))}
					</ul>

					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={handleBack}
							disabled={isFirstStep}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={() => (isLastStep ? handleReset() : handleNext())}
						>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}



//Instruction:
//1. Для получения активного контента использйте steps и activeIndex
//2. Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы
//3. Для того, чтобы вычислить необходимый класс используйте активный индекс, текущий индекс, а также тернарные операторы
//4. При клике на кнопку установка выбранного шага в качестве активного
// 5. "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия
//Или заменять всю кнопку в зависимости от условия

//Верстка шагов без логики
// 		 <li className={styles['steps-item'] + ' ' + styles.done}>
// 			 <button className={styles['steps-item-button']}>2</button>
// 						 Шаг 2
// 			 </li>
//			 <li
// 				className={ styles['steps-item'] + ' ' +  styles.done + + styles.active}
// 			>
// 	 		<button className={styles['steps-item-button']}>3</button>
// 	 				Шаг 3
//  		</li>
//  		<li className={styles['steps-item']}>
// 			 <button className={styles['steps-item-button']}>4</button>
// 	 				Шаг 4
//  		</li>

