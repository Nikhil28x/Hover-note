const api = window.electronAPI

if (!api) {
  console.error('electronAPI is unavailable — preload failed to load.')
}

document.getElementById('closeBtn').addEventListener('click', () => {
  api?.quit()
})

document.getElementById('copyBtn').addEventListener('click', async () => {
  const text = document.getElementById('notepad').value
  if (!text || !api) return
  const btn = document.getElementById('copyBtn')
  try {
    await api.copyText(text)
    btn.textContent = '✓'
    setTimeout(() => { btn.textContent = 'COPY' }, 1200)
  } catch (err) {
    console.error('copyText failed', err)
  }
})

document.getElementById('opacitySlider').addEventListener('input', (e) => {
  const alpha = (Number(e.target.value) / 100).toFixed(2)
  document.documentElement.style.setProperty('--bg-alpha', alpha)
})
