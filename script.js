document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(document.querySelectorAll('.project-card'));
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    
    // Define o índice de início: o card que deve estar centralizado
    // Se você tiver 4 cards, comece em 1 para centralizar o segundo card.
    let currentIndex = 1; 
    
    // *** DEFINIÇÕES IMPORTANTES (Confirme com seu CSS) ***
    const CARD_MARGIN = 30; // 15px de margem em cada lado do card (total: 30px)
    // Largura do card FOCADO (ajuste este valor se mudar o CSS do .focused-card)
    const FOCUSED_CARD_WIDTH = 350; 
    
    // Largura do card NÃO FOCADO (ajuste se mudar o CSS do .project-card)
    // Se o seu card base tem 300px e scale(0.85), a largura real é 300 * 0.85 = 255px
    const BASE_CARD_WIDTH = 300 * 0.85; 

    // 1. Função principal de atualização
    function updateCarousel() {
        // 1.1. Atualiza Foco e Dots
        cards.forEach((card, index) => {
            const dot = dotsContainer.children[index];
            card.classList.remove('focused-card');
            dot.classList.remove('active');
            
            if (index === currentIndex) {
                card.classList.add('focused-card');
                dot.classList.add('active');
            }
        });

        // 1.2. Cálculo da Posição de Translação (O Segredo!)
        let totalOffset = 0;

        // Itera sobre todos os cards ANTERIORES ao card focado (currentIndex)
        for (let i = 0; i < currentIndex; i++) {
            // Cada card anterior é um card base (não focado)
            totalOffset += BASE_CARD_WIDTH + CARD_MARGIN;
        }

        // Ajuste para CENTRALIZAR o card focado:
        // O card focado tem largura FOCUSED_CARD_WIDTH. Para centralizar o carrossel,
        // precisamos mover metade da diferença entre a largura do card focado e a largura base
        // (Isso é uma simplificação para carrosséis com cards de tamanhos diferentes, pode ser ajustado)
        const centerAdjustment = (FOCUSED_CARD_WIDTH - BASE_CARD_WIDTH) / 2;

        // O valor final de translação deve ser o total de offsets, mais o ajuste de centralização.
        const translationX = totalOffset - centerAdjustment;
        
        // Aplica a translação
        track.style.transform = `translateX(-${translationX}px)`;

        // 1.3. Esconde/Mostra os botões
        prevButton.style.opacity = currentIndex === 0 ? '0.3' : '1';
        prevButton.disabled = currentIndex === 0;
        
        nextButton.style.opacity = currentIndex === cards.length - 1 ? '0.3' : '1';
        nextButton.disabled = currentIndex === cards.length - 1;
    }

    // 2. Event Listeners para os botões
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // 3. Inicialização e Redimensionamento
    updateCarousel();
    
    // Opcional: Atualiza o carrossel se a tela for redimensionada
    window.addEventListener('resize', updateCarousel);

    
});
