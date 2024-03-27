const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        let score = 0;
        const player = { x: 50, y: canvas.height / 2, width: 30, height: 30, speed: 5 };
        const enemy = { x: 950, y: 0, width: 40, height: 40, speed: 2 };
        const bullets = [];
        const bulletSpeed = 5;
        const keys = {};

        function drawPlayer() {
            ctx.beginPath();
            ctx.moveTo(player.x, player.y - player.height / 2);
            ctx.lineTo(player.x + player.width, player.y);
            ctx.lineTo(player.x, player.y + player.height / 2);
            ctx.closePath();
            ctx.fillStyle = 'red';
            ctx.fill();
        }

        function drawEnemy() {
            const angle = Math.PI * 2 / 5; 
            const radius = enemy.width / 2; 
        
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                ctx.lineTo(enemy.x + radius * Math.cos(angle * i), enemy.y + radius * Math.sin(angle * i));
            }
            ctx.closePath();
            ctx.fillStyle = 'green';
            ctx.fill();
        }
        

        function drawBullet(bullet) {
            ctx.beginPath();
            ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2, true);
            ctx.fillStyle = 'blue';
            ctx.fill();
        }

        function drawScore() {
            ctx.font = '30px Arial bold';
            ctx.fillStyle = 'black';
            ctx.fillText('Score: ' + score, 10, 30);
        }
        
        function update() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            movePlayer();
            moveEnemy();
            drawPlayer();
            drawEnemy();
        
            for (let i = 0; i < bullets.length; i++) {
                let bullet = bullets[i];
                bullet.x += bulletSpeed;
        
                drawBullet(bullet);
        
                if (bullet.x > enemy.x - enemy.width / 2 &&
                    bullet.x < enemy.x + enemy.width / 2 &&
                    bullet.y > enemy.y - enemy.height / 2 &&
                    bullet.y < enemy.y + enemy.height / 2) {
                    score++;
                    bullets.splice(i, 1);
                    i--;
                }
            }
        
            drawScore(); 
            requestAnimationFrame(update);
        }
        

        function movePlayer() {
            if (keys['ArrowUp'] && player.y - player.height / 2 > 0) {
                player.y -= player.speed;
            }
            if (keys['ArrowDown'] && player.y + player.height / 2 < canvas.height) {
                player.y += player.speed;
            }
            if (keys['ArrowLeft'] && player.x > 0) {
                player.x -= player.speed;
            }
            if (keys['ArrowRight'] && player.x + player.width < canvas.width) {
                player.x += player.speed;
            }
        }

        function moveEnemy() {
            enemy.y += enemy.speed;
            if (enemy.y > canvas.height) {
                enemy.y = -enemy.height;
            }
        }

        document.addEventListener('keydown', function(event) {
            keys[event.code] = true;
            if (event.code === 'Space') {
                bullets.push({ x: player.x + player.width, y: player.y });
            }
        });

        document.addEventListener('keyup', function(event) {
            keys[event.code] = false;
        });

        update();

        