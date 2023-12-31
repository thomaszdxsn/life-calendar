"use client"

import styles from "./page.module.css";
import LifeCalendar from '@repo/ui/LifeCalendar'
import "@repo/ui/styles.css"
import { useForm } from 'react-hook-form'

const clamp = (min: number, val: number, max: number) => {
  return Math.min(Math.max(min, val), max)
}

const getByLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key)
  }
}

const defaultValues = {
  currentAge: Number(getByLocalStorage('currentAge')) || 25,
  lifespan: Number(getByLocalStorage('lifespan')) || 90,
}

export default function Page() {
  const form = useForm({
    defaultValues
  })
  const { currentAge, lifespan } = form.watch()
  return (
    <main className={styles.main}>
      <div className={styles.inputContainer}>
        <label>
          <span>Current Age</span>
          <input
            type="number"
            min={1}
            max={100}
            {...form.register('currentAge', {
              min: 1,
              max: 100,
              onChange(event) {
                const value = clamp(1, Number(event.target.value), form.getValues('lifespan'))
                form.setValue('currentAge', value)
                localStorage.setItem('currentAge', value.toString())
              },
            })}
          />
        </label>

        <label>
          <span>Lifespan</span>
          <input
            type="number"
            min={1}
            max={100}
            {...form.register('lifespan', {
              min: 1,
              max: 100,
              onChange(event) {
                const value = clamp(1, Number(event.target.value), 100)
                form.setValue('lifespan', value)
                localStorage.setItem('lifespan', value.toString())
              },
            })}
          />
        </label>
      </div>
      <LifeCalendar currentAge={currentAge} maxAge={lifespan} className="flex-1" />
    </main>
  )
}