import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="min-h-screen bg-slate-900 flex items-center justify-center">
    <h1 class="text-5xl font-bold text-sky-400 drop-shadow-lg">
          Tailwind + Vite funcionando!
    </h1>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)




