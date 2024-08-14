const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const noteFrequencies = {
    'C3': 130.81, 'F3': 174.61, 'G3': 196.00,
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
    // Añade más notas según sea necesario
};

function playNote(frequency) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousedown', () => {
        const nota = button.getAttribute('data-nota');
        if (noteFrequencies[nota]) {
            playNote(noteFrequencies[nota]);
        }
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    const button = document.querySelector(`button[data-key="${key}"]`);
    if (button) {
        const nota = button.getAttribute('data-nota');
        if (noteFrequencies[nota]) {
            playNote(noteFrequencies[nota]);
            button.classList.add('active');
        }
    }
});

document.addEventListener('keyup', (event) => {
    const key = event.key.toUpperCase();
    const button = document.querySelector(`button[data-key="${key}"]`);
    if (button) {
        button.classList.remove('active');
    }
});