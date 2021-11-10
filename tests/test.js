// приложение импортируется как зависимость
import init from '@hexlet/code';

// выполнится перед каждым тест-кейсом
beforeEach(async () => {
    await init();
});

test(() => {
    // код теста
});