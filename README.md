<h1>
    Система управления кофейней (или небольшим кафе) "XPresso".
</h1>


<p>
    Данное приложение служит для того, что бы помочь управляющим кофейнями (или небольшими кафе) настроить и оптимизировать бизнес процессы.
</p>

<h2>Конкурентные преимущества</h2>

<ul>
    <li>
        Простота эксплуатации.
    </li>
    <li>
        Не требует специализированного торгового оборудования.
    </li>
    <li>
        Работает внутри браузера, не требует сервера.
    </li>
</ul>


<h3>
    При помощи данного приложения можно:
</h3>

<ul>
    <li>
        Ускорить работу кассира.
    </li>
    <li>
        Разделить выполнение заказов между поварами.
    </li>
    <li>
        Проверять комплектность выдаваемых позиций.
    </li>
    <li>
        Организовать электронную очередь.
    </li>
</ul>

<hr>

<h3>Как пользоваться приложением?</h3>

<p>Для полноценной работы с приложением вам потребуется несколько мониторов.</p>
<p>Возможно, Вам может потребоваться программа для расширения рабочего стола на мобильные устройства с сенсорным экраном. Например:<a href="https://www.spacedesk.net/">SpaceDesk</a> или подобные ей.</p>

<ul>
  <li>
    Открыть главную страницу приложения по <a href='https://konstantintz.github.io/coffee-crm/'>ссылке.</a>
  </li>
  <li>
    Открыть элементы навигации: "Кухня", "Выдача", "Табло" в разных <b>окнах</b>.
  </li>
  <li>
    Открыть элементы навигации: "Кухня", "Выдача", "Табло" в разных <b>окнах</b> браузера и разместить их на соответствующих экранах.
  </li>
  <li>
    Перевести все открытые вкладки в полноэкранный режим при помощи клавиши на клавиатуре "F11".
  </li>
</ul>

<h3>Дополнительные разъяснения по настройке приложения</h3>

<ul>
  <li>
    Элементы навигации: "Кухня" желательно расположить на сенсорном экране и в зоне приготовления заказов.
  </li>
  <li>
    Элементы навигации: "Табло" расположить на экране в зоне видимости гостей Вашего заведения. (Элементы навигации можно скрыть и открыть по нажатию кнопки "Закрыть/Открыть навигацию" находящуюся слева от красной надписи "В процессе")
  </li>
  <li>
    Элементами навигации: "Меню", "Заказ","Выдача" и "История" может управлять один оператор.
  </li>

</ul>

<p>
  <b>Важные оговорки.</b> В демонстрационных целях позиции меню и цены указаны в вымышленной валюте "у.е.". Позиции меню преднастраиваются один раз перед использованием приложения в специальном файле.
</p>

<hr>

<h3>Алгоритм работы с приложением</h3>

<ul>
  <li>
    На странице "Меню" оператор добавляет соответствующие позиции озвученные гостем в нужном количестве (до 10 шт. на одну позицию).
  </li>
  <li>
    Далее позиции отображаются на странице "Заказ" в виде таблицы и могут быть скорректированы оператором, выбирается форма оплаты, гостю озвучивается сумма "К оплате", производятся взаиморасчеты. Оператором вручную выбивается чек на POS терминале.
  </li>
  <li>
    <b>После</b> завершения взаиморасчётов нажимается кнопка "Завершить оплату", высвечивается надпись "Сообщите номер заказа клиенту:M22(например)". Данное сообщение будет доступно на странице "Заказ" до добавления новой позиции в заказ из страницы "Меню"
    Номер заказа отображается на странице "Табло" в графе "В процессе"
  </li>
  <li>
    Далее заказ попадает на страницу "Кухня", где оператор отвечающий за приготовление заказа, нажимает на саму позицию по её готовности, при этом карточка позиции становится зелёной. По готовности всех позиций заказа активируется красная кнопка "Готов".
    По нажатии кнопки "Готов", раздаётся звуковой сигнал, позиция переводится на страницу "Выдача", а на странице "Табло" номер заказа перемещается в графу "Готов".
  </li>
  <li>
    Далее оператор отвечающий за выдачу на странице "Выдача" сверяет позиции предоставленные поваром с отображаемыми на экране, при различии сообщает повару и доукомплектовывает заказ. При отсутствии различий выдает соответствующий заказ гостю. При нажатии зелёной кнопки "Выдан" заказ пропадает из страницы "Табло", графы "Готов" и попадает на страницу "История". При поточной выдаче заказов, по окончании выдачи оператор может нажать зелёную кнопку "Выдать все заказы" в левом углу страницы "Выдача" и так же убрать все заказы со страницы "Табло", графы "Готов" и перевести их на страницу "История".
  </li>
  <li>
    На странице "История" заказ может быть скорректирован в меньшую сторону. При нажатии синей кнопки "Изменить" отображается всплывающее окно с позициями заказа и возможностью уменьшить их количество. При этом в графе "Возврат клиенту" отображается сумма к возврату. По завершению взаиморасчетов с клиентом нажимается кнопка "Сохранить изменения". Для отмены нажимается кнопка "Отмена" или "Х". Дополнительно для поиска заказа можно воспользоваться строкой поиска в верхней части страницы "История". Поиск производится по номеру заказа(можно ввести не более 3-х символов, регистр <strong>НЕ</strong> важен).
  </li>
  <li>
    По завершении рабочей смены оператор нажимает жёлтую кнопку "Закрыть смену" на странице "История". Отображается всплывающее окно с предупреждением. Далее по нажатии кнопки "Экспорт в Excel" производится экспорт истории заказов в файл с расширением ".xlsx" и сохраняется на жёсткий диск компьютера, при этом история заказов очищается. Для отмены нажимается кнопка "Отмена" или "Х".
  </li>
</ul>

<hr>

<h3>Стек технологий использованный при разработке данного приложения</h3>

<ul>
  <li>
   Библиотека React.
  </li>
  <li>
   Библиотека Bootstrap.
  </li>
  <li>
   Стейт менеджер MobX.
  </li>
  <li>
   Библиотека React Router.
  </li>
  <li>
   Для синхронизации работы в разных вкладках браузера использована библиотека mobx-persist-store.
  </li>
</ul>

<hr>

<h3>Планы развития приложения</h3>

<ul>
  <li>
   Добавления функционала печати номерков и списка заказанных позиций на термо принтере.
  </li>
  <li>
   Добавления функционала передачи информации о заказе на POS терминал.
  </li>
</ul>

