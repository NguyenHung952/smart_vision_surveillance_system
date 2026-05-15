const logs = document.getElementById('logs');

const logMessages = [
  'Phát hiện chuyển động tại Main Gate',
  'Face ID xác thực thành công: Nguyen Van A',
  'QR Attendance synced với SQLite',
  'Vehicle detected tại Parking Zone B',
  'YOLO detected 5 people',
  'Camera 02 FPS ổn định ở 30 FPS',
  'Gate access granted',
  'Biển số 51A-456.78 được nhận diện',
  'AI Parking cập nhật slot trống',
  'Face Recognition confidence đạt 98%'
];

function addLog() {
  const item = document.createElement('div');

  item.className = 'log-item';

  const random =
    logMessages[Math.floor(Math.random() * logMessages.length)];

  const time = new Date().toLocaleTimeString('vi-VN');

  item.innerHTML = `
    <div>
      <strong>${random}</strong>
      <div style="color: var(--muted); margin-top: 6px;">
        ${time}
      </div>
    </div>

    <div class="tag success">
      AI EVENT
    </div>
  `;

  logs.prepend(item);

  while (logs.children.length > 8) {
    logs.removeChild(logs.lastChild);
  }
}

setInterval(addLog, 1800);

addLog();
addLog();
addLog();

const counters = {
  fpsCounter: 30,
  personCount: 21,
  plateCount: 53,
  attendance: 128,
  parkingSlot: 12
};

function updateCounters() {
  counters.fpsCounter = 28 + Math.floor(Math.random() * 5);
  counters.personCount = 18 + Math.floor(Math.random() * 12);
  counters.plateCount += Math.floor(Math.random() * 2);
  counters.attendance += Math.floor(Math.random() * 2);
  counters.parkingSlot = 8 + Math.floor(Math.random() * 10);

  Object.keys(counters).forEach(id => {
    const element = document.getElementById(id);

    if (element) {
      element.textContent = counters[id];
    }
  });
}

setInterval(updateCounters, 2200);

function animateCamera(canvasId, color) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');

  canvas.width = 600;
  canvas.height = 260;

  let offset = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );

    gradient.addColorStop(0, '#08111f');
    gradient.addColorStop(1, '#13395f');

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 20; i++) {
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';

      ctx.beginPath();

      ctx.moveTo(i * 40 + offset, 0);

      ctx.lineTo(i * 40 - 80 + offset, canvas.height);

      ctx.stroke();
    }

    ctx.fillStyle = color;

    for (let i = 0; i < 5; i++) {
      ctx.fillRect(
        40 + ((i * 100 + offset * 2) % 600),
        50 + (i % 2) * 50,
        40,
        80
      );
    }

    ctx.fillStyle = 'rgba(0,229,255,0.18)';

    for (let i = 0; i < 60; i++) {
      ctx.beginPath();

      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }

    offset += 1;

    requestAnimationFrame(draw);
  }

  draw();
}

animateCamera('cam1', '#00ff99');
animateCamera('cam2', '#ff9800');
animateCamera('cam3', '#00e5ff');
animateCamera('cam4', '#9c27b0');

const ctx = document.getElementById('analyticsChart');

new Chart(ctx, {
  type: 'line',

  data: {
    labels: [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00'
    ],

    datasets: [
      {
        label: 'People Detection',
        data: [12, 19, 26, 30, 22, 35],
        borderColor: '#00e5ff',
        backgroundColor: 'rgba(0,229,255,0.15)',
        tension: 0.4,
        fill: true
      },

      {
        label: 'Vehicle Detection',
        data: [5, 12, 17, 25, 21, 28],
        borderColor: '#00ff99',
        backgroundColor: 'rgba(0,255,153,0.15)',
        tension: 0.4,
        fill: true
      }
    ]
  },

  options: {
    responsive: true,

    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      }
    },

    scales: {
      x: {
        ticks: {
          color: '#9fb3c8'
        },

        grid: {
          color: 'rgba(255,255,255,0.06)'
        }
      },

      y: {
        ticks: {
          color: '#9fb3c8'
        },

        grid: {
          color: 'rgba(255,255,255,0.06)'
        }
      }
    }
  }
});
