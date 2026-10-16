import { BRAND } from '@utils/constants';

export default function CapsuleSection() {
  return (
    <div className="capsule mt-14">
      <strong>Коротко.</strong> INCY — приложение-клиент: оно подключает к серверу по ключу-подписке, который вы
      добавляете внутри. Скачайте INCY, вставьте ключ ссылкой или по QR — и вы в сети. Один ключ работает на телефоне,
      ПК и телевизоре. Рабочий ключ для INCY можно бесплатно получить на 1 день в сервисе {BRAND}.
    </div>
  );
}
