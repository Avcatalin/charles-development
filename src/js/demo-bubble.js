export default function () {
    const $demoBubble = document.getElementById('charles-demo-bubble')
    if (!$demoBubble) return

    if (window.location.href.includes('apply-for-a-demo')) return

    $demoBubble.style.display = 'block'

    const $bubble = $demoBubble.querySelector('.c-demo-bubble--bubble')

    let autoShowTimer

    const toggleBubble = () => {
        if ($bubble && $bubble.classList.contains('bubble-show')) {
            hideBubble()
        } else {
            showBubble()
        }
    }

    const showBubble = () => {
        if ($bubble) {
            $bubble.style.display = 'block'
            setTimeout(() => {
                $bubble.classList.add('bubble-show')
            }, 25)
        }
        if (autoShowTimer) {
            clearTimeout(autoShowTimer)
            autoShowTimer = undefined
        }
    }

    const hideBubble = () => {
        if ($bubble) {
            $bubble.classList.remove('bubble-show')
            setTimeout(() => {
                $bubble.style.display = 'none'
            }, 400)
        }
    }

    $demoBubble.addEventListener('click', (e) => {
        toggleBubble()
    })

    autoShowTimer = setTimeout(() => {
        showBubble()
    }, 5000)
}