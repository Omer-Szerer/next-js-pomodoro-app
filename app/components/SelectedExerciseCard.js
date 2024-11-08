import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React, { useEffect, useState } from 'react';
import { exercises } from '../database/fakeDB';
import styles from '../styles/SelectedExerciseCard.module.scss';
import ExerciseTimer from './ExerciseTimer';

export default function ExerciseCard({ breakType }) {
  const [randomExercise, setRandomExercise] = useState({
    id: 'default',
    name: "Enjoy your break, and don't forget to drink water!",
    category: 'General',
  });

  useEffect(() => {
    const filteredExercises = breakType
      ? exercises.filter((exercise) => exercise.category === breakType)
      : exercises;

    if (filteredExercises.length > 0) {
      const selectedExercise =
        filteredExercises[Math.floor(Math.random() * filteredExercises.length)];
      setRandomExercise(selectedExercise);
    } else {
      setRandomExercise({
        id: 'default',
        name: "Enjoy your break, and don't forget to drink water!",
        category: 'General',
      });
    }
  }, [breakType]);

  return (
    <div>
      <div
        key={`exercise-${randomExercise.id}`}
        className={styles.exerciseCard}
      >
        <h3 className={styles.exerciseName}>
          {randomExercise.name.replace(/(?<=[a-zA-Z])-|-(?=[a-zA-Z])/g, ' ')}
        </h3>
        {randomExercise.id !== 'default' && (
          <div className={styles.animationContainer}>
            <DotLottieReact
              src={`/animations/${randomExercise.category}/${randomExercise.name}.lottie`}
              loop
              autoplay
              width="150px"
            />
          </div>
        )}
        {randomExercise.id !== 'default' && (
          <div>
            <ExerciseTimer />
          </div>
        )}
      </div>
    </div>
  );
}