const COURSE = {
  "sources": {
    "logic": [
      "Compendio di logica",
      "Riccardo Bruni · Università di Firenze",
      "https://www.unifi.it/sites/default/files/2024-07/compendio_logica.pdf"
    ],
    "orient": [
      "Logica e ragionamento",
      "Orientazione · примеры рассуждений",
      "https://portale.orientazione.it/quadri-di-riferimento/tutti-i-quadri/logica"
    ],
    "civic": [
      "La Costituzione",
      "Senato della Repubblica · первоисточник",
      "https://www.senato.it/istituzione/la-costituzione"
    ],
    "bio": [
      "Compendio di biologia",
      "Filippo Frizzi · Firenze University Press",
      "https://books.fupress.com/catalogue/idialogarei-compendio-di-biologia/3355"
    ],
    "anat": [
      "Anatomia e fisiologia",
      "Orientazione · темы и задания",
      "https://portale.orientazione.it/sites/default/files/2022-03/QdR%20Biologia%20-%20Nucleo%20tematico%205%20%28v1.2022%29.pdf"
    ],
    "muscle": [
      "Skeletal Muscle",
      "OpenStax · иллюстрации мышц, на английском",
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/10-2-skeletal-muscle"
    ],
    "math": [
      "Compendio di matematica",
      "Daniele Buratta · Università di Firenze",
      "https://www.unifi.it/sites/default/files/2024-07/compendio_matematica.pdf"
    ],
    "physics": [
      "Compendio di fisica",
      "Manuela Lima · Firenze University Press",
      "https://books.fupress.it/catalogue/idialogarei-compendio-di-fisica/3354"
    ],
    "chem": [
      "Compendio di chimica",
      "Riccardo Peruzzini · Firenze University Press",
      "https://books.fupress.it/catalogue/idialogarei-compendio-di-chimica/3356"
    ],
    "test": [
      "Scienze motorie 2026/27",
      "Tor Vergata · правила экзамена, статья 4 bando",
      "https://web.uniroma2.it/it/percorso/offerta_formativa/sezione/scienze_motorie"
    ]
  },
  "lessons": [
    {
      "id": "ded",
      "group": 0,
      "name": "Условия и выводы",
      "it": "Condizioni e deduzioni",
      "word": "a condizione che",
      "translation": "при условии, что",
      "rule": "В условии «se A, allora B» событие A гарантирует B. Из отсутствия B можно вывести отсутствие A. Слово solo перед se указывает на необходимое условие.",
      "example": "«Entro solo se ho il pass» означает, что вход требует пропуска. Один лишь пропуск ещё не гарантирует вход.",
      "refs": [
        "logic",
        "orient"
      ],
      "questions": [
        {
          "id": "ded-1",
          "ask": "Se piove, la pista chiude. La pista è aperta. Che cosa segue?",
          "choices": [
            "Non piove",
            "Piove",
            "È mattina",
            "La pista è coperta"
          ],
          "why": "Если бы шёл дождь, дорожка была бы закрыта. Открытая дорожка исключает дождь при данном правиле."
        },
        {
          "id": "ded-2",
          "ask": "Luca corre solo se ha tempo. Oggi corre. Dunque…",
          "choices": [
            "oggi ha tempo",
            "corre ogni giorno",
            "oggi è libero tutto il giorno",
            "ha corso ieri"
          ],
          "why": "Solo se задаёт необходимое условие. Для этой пробежки у Луки нашлось время."
        },
        {
          "id": "ded-3",
          "ask": "Se l’orologio è scarico, lo schermo è spento. Lo schermo è spento. Cosa sappiamo della batteria?",
          "choices": [
            "La carica è indeterminata",
            "È certamente scarica",
            "È certamente piena",
            "È nuova"
          ],
          "why": "У выключенного экрана могут быть и другие причины. Из следствия нельзя восстановить единственную причину."
        },
        {
          "id": "ded-4",
          "ask": "Tutti i finalisti si sono qualificati. Ada è finalista. Che cosa è certo?",
          "choices": [
            "Ada si è qualificata",
            "Ada ha vinto",
            "Ada è l’unica qualificata",
            "Tutti i qualificati sono finalisti"
          ],
          "why": "Ада входит в группу финалистов, поэтому на неё распространяется общее утверждение."
        },
        {
          "id": "ded-5",
          "ask": "Quale frase equivale a «Se studio, imparo» sul piano logico?",
          "choices": [
            "Se non imparo, non studio",
            "Se imparo, studio",
            "Se non studio, non imparo",
            "Studio sempre"
          ],
          "why": "Контрапозиция меняет условие и следствие местами и отрицает оба."
        },
        {
          "id": "ded-6",
          "ask": "La tessera è necessaria per entrare. Chi resta fuori…",
          "choices": [
            "potrebbe avere la tessera",
            "non ha mai la tessera",
            "ha sempre la tessera",
            "è già entrato"
          ],
          "why": "Требование действует для входа. О человеке снаружи данных недостаточно."
        }
      ]
    },
    {
      "id": "sets",
      "group": 0,
      "name": "Множества и отрицание",
      "it": "Insiemi e negazioni",
      "word": "almeno uno",
      "translation": "хотя бы один",
      "rule": "Переводи кванторы буквально. Tutti — все, nessuno — ни один, alcuni — хотя бы некоторые. Чтобы опровергнуть утверждение о всех, достаточно одного исключения.",
      "example": "Отрицание «tutti nuotano» звучит как «almeno una persona non nuota». Остальные при этом вполне могут плавать.",
      "refs": [
        "logic",
        "orient"
      ],
      "questions": [
        {
          "id": "sets-1",
          "ask": "Qual è la negazione di «Tutti i soci nuotano»?",
          "choices": [
            "Almeno un socio non nuota",
            "Nessun socio nuota",
            "Tutti corrono",
            "Un socio nuota"
          ],
          "why": "Один контрпример уже опровергает утверждение о всех."
        },
        {
          "id": "sets-2",
          "ask": "Nessun velocista del gruppo è assente. Mia è una velocista del gruppo. Mia è…",
          "choices": [
            "presente",
            "assente",
            "allenatrice",
            "infortunata"
          ],
          "why": "Никто из спринтеров группы не отсутствует, и Мия входит в эту группу."
        },
        {
          "id": "sets-3",
          "ask": "Quale frase nega «Nessuna lezione è facile»?",
          "choices": [
            "Almeno una lezione è facile",
            "Ogni lezione è facile",
            "Ogni lezione è difficile",
            "Le lezioni sono molte"
          ],
          "why": "Достаточно одной лёгкой лекции, чтобы опровергнуть исходную фразу."
        },
        {
          "id": "sets-4",
          "ask": "Su 20 studenti, 12 corrono, 9 nuotano e 5 fanno entrambe le attività. Quanti fanno almeno una delle due?",
          "choices": [
            "16",
            "21",
            "11",
            "4"
          ],
          "why": "Складываем 12 и 9, затем вычитаем 5 человек, посчитанных дважды."
        },
        {
          "id": "sets-5",
          "ask": "Un corso accetta chi parla italiano o francese, anche entrambe le lingue. Chi resta escluso per lingua?",
          "choices": [
            "Chi non parla nessuna delle due",
            "Chi parla solo italiano",
            "Chi parla solo francese",
            "Chi parla entrambe"
          ],
          "why": "Включающее «или» допускает знание одного или обоих языков. Исключён тот, кто не говорит ни на одном из них."
        },
        {
          "id": "sets-6",
          "ask": "Alcuni medici sono atleti. Quale frase segue necessariamente?",
          "choices": [
            "Alcuni atleti sono medici",
            "Tutti gli atleti sono medici",
            "Nessun atleta è medico",
            "Tutti i medici sono atleti"
          ],
          "why": "Пересечение двух множеств содержит хотя бы одного человека независимо от порядка названий."
        }
      ]
    },
    {
      "id": "order",
      "group": 0,
      "name": "Порядок и закономерности",
      "it": "Ordine e sequenze",
      "word": "precedere",
      "translation": "предшествовать",
      "rule": "Запиши участников в одну строку. Между «prima di» и «subito prima di» есть разница: только во втором случае места обязательно соседние. В числовом ряду сначала проверь разности, затем отношения.",
      "example": "Если Lia финишировала раньше Eva, а Eva раньше Zoe, порядок будет Lia, Eva, Zoe.",
      "refs": [
        "orient",
        "logic"
      ],
      "questions": [
        {
          "id": "order-1",
          "ask": "Ivo arriva prima di Tea; Tea prima di Max. Chi arriva per ultimo tra i tre?",
          "choices": [
            "Max",
            "Tea",
            "Ivo",
            "Non si può sapere"
          ],
          "why": "Получается цепочка Ivo, Tea, Max."
        },
        {
          "id": "order-2",
          "ask": "La serie cresce aggiungendo numeri dispari consecutivi: 2, 5, 10, 17. Quale numero segue?",
          "choices": [
            "26",
            "24",
            "25",
            "34"
          ],
          "why": "Прибавлялись 3, 5, 7. Следующее нечётное число 9 даёт 26."
        },
        {
          "id": "order-3",
          "ask": "In una fila di cinque, Lia è terza. Quante persone sono dietro di lei?",
          "choices": [
            "2",
            "3",
            "1",
            "4"
          ],
          "why": "После третьего места остаются четвёртое и пятое."
        },
        {
          "id": "order-4",
          "ask": "Ogni termine è il doppio del precedente meno uno. Dopo 3, 5, 9 viene…",
          "choices": [
            "17",
            "18",
            "16",
            "19"
          ],
          "why": "Подставь последнее число в правило. 2 × 9 − 1 = 17."
        },
        {
          "id": "order-5",
          "ask": "In tre turni A precede C e B è subito dopo C. Qual è l’ordine?",
          "choices": [
            "A, C, B",
            "C, A, B",
            "B, C, A",
            "A, B, C"
          ],
          "why": "Блок C,B занимает два соседних места. Единственное оставшееся место до C занимает A."
        },
        {
          "id": "order-6",
          "ask": "Anna supera la seconda classificata durante la gara. In che posizione si trova subito dopo?",
          "choices": [
            "Seconda",
            "Prima",
            "Terza",
            "Quarta"
          ],
          "why": "Анна занимает место обогнанной участницы. Лидер всё ещё впереди."
        }
      ]
    },
    {
      "id": "read",
      "group": 0,
      "name": "Чтение и аргументы",
      "it": "Comprensione del testo",
      "word": "tuttavia",
      "translation": "однако",
      "rule": "Отделяй то, что сказано в тексте, от правдоподобной догадки. Tuttavia вводит возражение, pertanto — вывод, poiché — причину. В сравнении ищи, кого сравнили и что измеряли.",
      "example": "«Il tempo è migliorato, tuttavia il campione era piccolo». Первая часть сообщает результат, вторая ограничивает уверенность в выводе.",
      "refs": [
        "orient",
        "logic"
      ],
      "questions": [
        {
          "id": "read-1",
          "ask": "«Il corso è gratuito, ma serve prenotare». Quale affermazione rispetta il testo?",
          "choices": [
            "La prenotazione è richiesta",
            "L’ingresso è sempre libero senza prenotare",
            "Prenotare costa",
            "Il corso è pieno"
          ],
          "why": "Бесплатный курс требует записи. О стоимости записи и числе мест фраза ничего не говорит."
        },
        {
          "id": "read-2",
          "ask": "«Poiché la palestra è chiusa, ci alleniamo fuori». Qual è la causa?",
          "choices": [
            "La chiusura della palestra",
            "L’allenamento all’aperto",
            "Il sole",
            "La corsa"
          ],
          "why": "После poiché сообщается причина, по которой тренировку перенесли на улицу."
        },
        {
          "id": "read-3",
          "ask": "«Solo quattro dei dieci iscritti hanno risposto». A chi si riferiscono le risposte?",
          "choices": [
            "Ai quattro rispondenti",
            "A tutti gli iscritti",
            "A sei iscritti",
            "A tutti gli atleti italiani"
          ],
          "why": "Мнения шести остальных неизвестны. Ответы описывают четверых."
        },
        {
          "id": "read-4",
          "ask": "«La media è salita, tuttavia non tutti sono migliorati». Che cosa introduce tuttavia?",
          "choices": [
            "Una precisazione che limita la conclusione",
            "Una causa",
            "Un esempio di vittoria",
            "Una data"
          ],
          "why": "Рост среднего допускает разные индивидуальные результаты. Союз вводит оговорку."
        },
        {
          "id": "read-5",
          "ask": "Due gruppi scelgono da soli quanto allenarsi. Il gruppo più attivo dorme meglio. Quale conclusione è giustificata?",
          "choices": [
            "Nel campione attività e sonno sono associati",
            "L’attività è certamente l’unica causa",
            "Il sonno è identico per tutti",
            "Ogni persona attiva dorme bene"
          ],
          "why": "Группы сформировались самостоятельно. Связь наблюдается, но такая схема не изолирует влияние других факторов."
        },
        {
          "id": "read-6",
          "ask": "«La biblioteca apre anche il sabato». Quale informazione manca?",
          "choices": [
            "L’orario preciso di apertura",
            "L’apertura di sabato",
            "Il tipo di luogo",
            "Il giorno citato"
          ],
          "why": "Мы знаем день, но конкретного часа в предложении нет."
        }
      ]
    },
    {
      "id": "civic",
      "group": 0,
      "name": "Италия и её институты",
      "it": "Istituzioni italiane",
      "word": "la sovranità",
      "translation": "суверенитет",
      "rule": "В статье 1 Конституции Италии говорится о демократической республике и суверенитете народа. Парламент включает Camera dei deputati и Senato della Repubblica. Правительство должно пользоваться доверием обеих палат.",
      "example": "Различай даты. Референдум о форме правления состоялся 2 июня 1946 года. Конституция вступила в силу 1 января 1948 года.",
      "refs": [
        "civic"
      ],
      "questions": [
        {
          "id": "civic-1",
          "ask": "Secondo l’articolo 1, a chi appartiene la sovranità?",
          "choices": [
            "Al popolo",
            "Al Governo",
            "Al Senato soltanto",
            "Ai sindaci"
          ],
          "why": "Статья 1 закрепляет суверенитет народа. Он осуществляется в формах и пределах Конституции."
        },
        {
          "id": "civic-2",
          "ask": "Quali sono le due Camere del Parlamento italiano?",
          "choices": [
            "Camera dei deputati e Senato della Repubblica",
            "Governo e Senato",
            "Camera e Consiglio dei ministri",
            "Regioni e Comuni"
          ],
          "why": "Статья 55 называет Палату депутатов и Сенат Республики."
        },
        {
          "id": "civic-3",
          "ask": "Quando è entrata in vigore la Costituzione repubblicana?",
          "choices": [
            "Il 1° gennaio 1948",
            "Il 2 giugno 1946",
            "Il 25 aprile 1945",
            "Il 1° gennaio 2002"
          ],
          "why": "Конституция начала действовать в первый день 1948 года."
        },
        {
          "id": "civic-4",
          "ask": "Da chi deve ottenere la fiducia il Governo italiano?",
          "choices": [
            "Da entrambe le Camere",
            "Dai soli sindaci",
            "Dalla sola Camera dei deputati",
            "Dalla Corte costituzionale"
          ],
          "why": "Согласно статье 94, правительству требуется доверие обеих палат."
        },
        {
          "id": "civic-5",
          "ask": "Che cosa si scelse nel referendum istituzionale del 1946?",
          "choices": [
            "Tra monarchia e repubblica",
            "Tra euro e lira",
            "Tra due capitali",
            "Tra due costituzioni regionali"
          ],
          "why": "Итальянцы голосовали за форму правления. Победила республика."
        },
        {
          "id": "civic-6",
          "ask": "Quale articolo afferma l’uguaglianza dei cittadini davanti alla legge?",
          "choices": [
            "L’articolo 3",
            "L’articolo 1",
            "L’articolo 11",
            "L’articolo 55"
          ],
          "why": "Принцип равенства граждан перед законом сформулирован в статье 3."
        }
      ]
    },
    {
      "id": "data",
      "group": 0,
      "name": "Данные и сравнения",
      "it": "Dati e confronti",
      "word": "la quota",
      "translation": "доля",
      "rule": "Смотри на знаменатель. Число успешных попыток и их доля отвечают на разные вопросы. Для доли раздели число успехов на число попыток. Разность двух процентов выражают в процентных пунктах.",
      "example": "В группе A успешно 8 из 10 попыток, в B — 12 из 20. У B больше успехов, а у A выше доля успешных попыток (80% против 60%).",
      "refs": [
        "math",
        "orient"
      ],
      "questions": [
        {
          "id": "data-1",
          "ask": "A segna 9 tiri su 12, B ne segna 8 su 10. Chi ha la percentuale maggiore?",
          "choices": [
            "B",
            "A",
            "Sono uguali",
            "Dati insufficienti"
          ],
          "why": "У A получается 75%, у B — 80%."
        },
        {
          "id": "data-2",
          "ask": "Il tasso di successo passa dal 40% al 50%. Di quanti punti percentuali aumenta?",
          "choices": [
            "10",
            "25",
            "5",
            "90"
          ],
          "why": "В процентных пунктах достаточно вычесть 40 из 50."
        },
        {
          "id": "data-3",
          "ask": "Tre tempi sono 11, 12 e 16 minuti. Qual è la media?",
          "choices": [
            "13 minuti",
            "12 minuti",
            "14 minuti",
            "39 minuti"
          ],
          "why": "Сумма равна 39. Делим на три измерения."
        },
        {
          "id": "data-4",
          "ask": "In un grafico, l’asse verticale indica chilometri e quello orizzontale giorni. Un punto (3, 8) indica…",
          "choices": [
            "8 km al giorno 3",
            "3 km al giorno 8",
            "24 km al giorno",
            "8 giorni di pausa"
          ],
          "why": "Первое число относится к горизонтальной оси, второе — к вертикальной."
        },
        {
          "id": "data-5",
          "ask": "Qual è la mediana di 3, 4, 8, 9, 21?",
          "choices": [
            "8",
            "9",
            "4",
            "21"
          ],
          "why": "В упорядоченном ряду из пяти значений медиана стоит на третьем месте."
        },
        {
          "id": "data-6",
          "ask": "La squadra A ha 20 iscritti, la B ne ha 40. Ciascuna ha 10 presenti. Quale ha la quota di presenti più alta?",
          "choices": [
            "La squadra A",
            "La squadra B",
            "Le quote sono uguali",
            "Nessuna ha presenti"
          ],
          "why": "В A пришла половина участников, в B только четверть."
        }
      ]
    },
    {
      "id": "cell",
      "group": 1,
      "name": "Клетка и энергия",
      "it": "Cellula ed energia",
      "word": "il mitocondrio",
      "translation": "митохондрия",
      "rule": "Мембрана регулирует обмен со средой. В ядре хранится основная часть ДНК клетки человека. Рибосомы собирают белки. При аэробном дыхании митохондрии дают клетке большую часть АТФ.",
      "example": "Во время бега мышца расходует АТФ. Митохондрии помогают пополнять запас, используя энергию питательных веществ.",
      "refs": [
        "bio"
      ],
      "questions": [
        {
          "id": "cell-1",
          "ask": "Quale struttura controlla il passaggio di molte sostanze tra cellula e ambiente?",
          "choices": [
            "La membrana plasmatica",
            "Il nucleolo",
            "Il cromosoma X",
            "Il centriolo"
          ],
          "why": "Мембрана отделяет содержимое клетки и избирательно пропускает вещества."
        },
        {
          "id": "cell-2",
          "ask": "Dove si trova la maggior parte del DNA di una cellula muscolare umana?",
          "choices": [
            "Nei nuclei",
            "Nei lisosomi",
            "Nei ribosomi",
            "Nella membrana esterna"
          ],
          "why": "Основная часть ДНК находится в ядрах. Небольшой собственный геном есть у митохондрий."
        },
        {
          "id": "cell-3",
          "ask": "Qual è la funzione principale dei ribosomi?",
          "choices": [
            "Sintetizzare proteine",
            "Pompare sangue",
            "Duplicare interi organi",
            "Produrre bile"
          ],
          "why": "Рибосома читает информацию мРНК и соединяет аминокислоты в цепочку."
        },
        {
          "id": "cell-4",
          "ask": "Quale molecola fornisce direttamente energia ai cicli di contrazione muscolare?",
          "choices": [
            "ATP",
            "DNA",
            "Cellulosa",
            "Emoglobina"
          ],
          "why": "Мышечные белки используют энергию гидролиза АТФ."
        },
        {
          "id": "cell-5",
          "ask": "Una fibra muscolare ricca di mitocondri è ben attrezzata per quale processo?",
          "choices": [
            "La produzione aerobica di ATP",
            "La formazione dello smalto",
            "La secrezione di bile",
            "La sintesi di cellulosa"
          ],
          "why": "В митохондриях происходят этапы аэробного дыхания, обеспечивающие высокий выход АТФ."
        },
        {
          "id": "cell-6",
          "ask": "Se molecole di un soluto attraversano passivamente una membrana secondo il gradiente, il flusso netto va…",
          "choices": [
            "verso la concentrazione minore",
            "verso la concentrazione maggiore",
            "sempre verso il nucleo",
            "sempre fuori dalla cellula"
          ],
          "why": "При простой диффузии чистый поток направлен из области большей концентрации в область меньшей."
        }
      ]
    },
    {
      "id": "heart",
      "group": 1,
      "name": "Путь крови и кислорода",
      "it": "Cuore e respirazione",
      "word": "la gittata cardiaca",
      "translation": "минутный объём сердца",
      "rule": "Проследи один круг. Правый желудочек отправляет кровь в лёгкие. В альвеолах кислород диффундирует в кровь, которая возвращается в левое предсердие. Затем левый желудочек выталкивает её в аорту.",
      "example": "Артерию определяют по направлению потока от сердца. Поэтому лёгочная артерия тоже артерия, хотя несёт кровь с относительно низким содержанием кислорода.",
      "refs": [
        "anat",
        "bio"
      ],
      "questions": [
        {
          "id": "heart-1",
          "ask": "Da quale camera parte il sangue diretto ai polmoni?",
          "choices": [
            "Dal ventricolo destro",
            "Dal ventricolo sinistro",
            "Dall’atrio sinistro",
            "Dall’aorta"
          ],
          "why": "Правый желудочек выталкивает кровь в лёгочный ствол, затем она идёт по лёгочным артериям."
        },
        {
          "id": "heart-2",
          "ask": "Dove avvengono principalmente gli scambi gassosi con il sangue nei polmoni?",
          "choices": [
            "Negli alveoli",
            "Nella trachea",
            "Nella laringe",
            "Nelle corde vocali"
          ],
          "why": "Тонкая граница между альвеолой и капилляром позволяет газам диффундировать."
        },
        {
          "id": "heart-3",
          "ask": "Quale vaso porta sangue dal ventricolo sinistro al circolo sistemico?",
          "choices": [
            "L’aorta",
            "La vena cava superiore",
            "L’arteria polmonare",
            "La vena porta"
          ],
          "why": "Аорта начинает большой круг кровообращения."
        },
        {
          "id": "heart-4",
          "ask": "Le vene polmonari sfociano…",
          "choices": [
            "nell’atrio sinistro",
            "nel ventricolo destro",
            "nell’aorta",
            "nell’atrio destro"
          ],
          "why": "По лёгочным венам насыщенная кислородом кровь возвращается в левое предсердие."
        },
        {
          "id": "heart-5",
          "ask": "Quale componente del sangue trasporta la maggior parte dell’ossigeno?",
          "choices": [
            "L’emoglobina dei globuli rossi",
            "Le piastrine",
            "I globuli bianchi",
            "Il glucosio"
          ],
          "why": "Кислород обратимо связывается с гемоглобином эритроцитов."
        },
        {
          "id": "heart-6",
          "ask": "Con 70 battiti/min e 70 mL per battito, quanto vale la gittata cardiaca?",
          "choices": [
            "4,9 L/min",
            "0,49 L/min",
            "49 L/min",
            "1 L/min"
          ],
          "why": "70 × 70 = 4900 мл за минуту. Деление на 1000 даёт 4,9 литра."
        }
      ]
    },
    {
      "id": "muscles",
      "group": 1,
      "name": "Мышцы и движение",
      "it": "Muscoli e movimento",
      "word": "il tendine",
      "translation": "сухожилие",
      "rule": "Скелетная мышца передаёт усилие кости через сухожилие. Связка соединяет кости сустава. В каждом саркомере актиновые и миозиновые нити скользят друг относительно друга. Для работы нужен АТФ.",
      "example": "Попробуй согнуть локоть, а затем удержать сумку на месте. Во втором случае усилие сохраняется при почти неизменной длине мышцы — это пример изометрической работы.",
      "refs": [
        "muscle",
        "anat"
      ],
      "questions": [
        {
          "id": "muscles-1",
          "ask": "Che cosa collega di solito un tendine?",
          "choices": [
            "Un muscolo a un osso",
            "Due ossa tra loro",
            "Un nervo alla pelle",
            "Due alveoli"
          ],
          "why": "Сухожилие передаёт тягу мышцы к кости."
        },
        {
          "id": "muscles-2",
          "ask": "Quale struttura contribuisce a stabilizzare un’articolazione unendo ossa tra loro?",
          "choices": [
            "Un legamento",
            "Un alveolo",
            "Una vena",
            "Una fibra cutanea"
          ],
          "why": "Связки соединяют кости и ограничивают чрезмерные движения сустава."
        },
        {
          "id": "muscles-3",
          "ask": "Durante una contrazione isometrica ideale, che cosa resta costante?",
          "choices": [
            "La lunghezza del muscolo",
            "La quantità di ossigeno dell’ambiente",
            "Il numero dei battiti",
            "La velocità del sangue"
          ],
          "why": "Мышца развивает силу, сохраняя длину. Пример — удерживание груза."
        },
        {
          "id": "muscles-4",
          "ask": "Qual è l’unità contrattile ripetuta del muscolo striato?",
          "choices": [
            "Il sarcomero",
            "Il neurone",
            "Il nefrone",
            "L’alveolo"
          ],
          "why": "Саркомеры последовательно располагаются вдоль миофибриллы."
        },
        {
          "id": "muscles-5",
          "ask": "Quando un sarcomero si accorcia, cosa fanno i filamenti di actina e miosina?",
          "choices": [
            "Scorrono gli uni rispetto agli altri",
            "Scompaiono",
            "Diventano ossa",
            "Si dimezzano tutti in lunghezza"
          ],
          "why": "Меняется перекрытие нитей. Сами нити сохраняют длину."
        },
        {
          "id": "muscles-6",
          "ask": "Quale movimento avvicina l’avambraccio al braccio riducendo l’angolo al gomito?",
          "choices": [
            "Flessione",
            "Estensione",
            "Rotazione del tronco",
            "Abduzione dell’anca"
          ],
          "why": "Сгибание уменьшает угол между звеньями в локтевом суставе."
        }
      ]
    },
    {
      "id": "systems",
      "group": 1,
      "name": "Органы и регуляция",
      "it": "Organi e regolazione",
      "word": "l’omeostasi",
      "translation": "гомеостаз",
      "rule": "Ткани образуют органы, а органы работают в системах. Нейроны передают сигналы, почки регулируют состав жидкостей, тонкая кишка всасывает питательные вещества. Гомеостаз поддерживает внутренние показатели в рабочем диапазоне.",
      "example": "Когда температура тела повышается, испарение пота отводит тепло. Ответ ослабляет первоначальное отклонение — это отрицательная обратная связь.",
      "refs": [
        "anat",
        "bio"
      ],
      "questions": [
        {
          "id": "systems-1",
          "ask": "Quale sequenza procede dal livello più semplice al più complesso?",
          "choices": [
            "Cellula, tessuto, organo, apparato",
            "Organo, tessuto, apparato, cellula",
            "Tessuto, cellula, apparato, organo",
            "Apparato, organo, tessuto, cellula"
          ],
          "why": "Клетки формируют ткани. Из тканей состоят органы, а органы объединяются в системы."
        },
        {
          "id": "systems-2",
          "ask": "Quale organo regola acqua e sali filtrando il plasma e modificando il filtrato?",
          "choices": [
            "Il rene",
            "Il cuore",
            "Il polmone",
            "La milza"
          ],
          "why": "Нефроны почек фильтруют плазму и избирательно возвращают вещества в кровь."
        },
        {
          "id": "systems-3",
          "ask": "I villi dell’intestino tenue servono principalmente ad aumentare…",
          "choices": [
            "la superficie di assorbimento",
            "la frequenza cardiaca",
            "il volume dei polmoni",
            "la rigidità delle ossa"
          ],
          "why": "Ворсинки увеличивают площадь контакта со всасываемыми веществами."
        },
        {
          "id": "systems-4",
          "ask": "Quale cellula è specializzata nella trasmissione di segnali elettrici a distanza?",
          "choices": [
            "Il neurone",
            "L’eritrocita",
            "L’adipocita",
            "L’osteoclasto"
          ],
          "why": "Нервный импульс распространяется по мембране, в том числе вдоль аксона нейрона."
        },
        {
          "id": "systems-5",
          "ask": "La temperatura sale e la sudorazione favorisce il raffreddamento. È un esempio di…",
          "choices": [
            "feedback negativo",
            "feedback positivo",
            "digestione chimica",
            "duplicazione del DNA"
          ],
          "why": "Ответ уменьшает величину исходного отклонения температуры."
        },
        {
          "id": "systems-6",
          "ask": "Quale tessuto riveste la superficie del corpo e molte cavità interne?",
          "choices": [
            "Il tessuto epiteliale",
            "Il tessuto osseo",
            "Il tessuto muscolare cardiaco",
            "Il tessuto cartilagineo"
          ],
          "why": "Эпителий образует наружные и внутренние покровы."
        }
      ]
    },
    {
      "id": "maths",
      "group": 2,
      "name": "Пропорции и вероятности",
      "it": "Proporzioni e probabilità",
      "word": "a parità di",
      "translation": "при равном значении",
      "rule": "Приведи единицы к одному виду, затем составь отношение. При равновозможных исходах вероятность равна числу подходящих исходов, делённому на общее число исходов.",
      "example": "В мешке 3 красных и 2 синих мяча. Вероятность наугад достать синий равна 2/5. Если шар не возвращают, состав мешка для второго извлечения меняется.",
      "refs": [
        "math"
      ],
      "questions": [
        {
          "id": "maths-1",
          "ask": "Una bevanda contiene 6 g di zucchero per 100 mL. Quanti grammi ci sono in 250 mL?",
          "choices": [
            "15 g",
            "12 g",
            "2,4 g",
            "25 g"
          ],
          "why": "В 250 мл помещается 2,5 порции по 100 мл. Умножаем 6 на 2,5."
        },
        {
          "id": "maths-2",
          "ask": "Quattro corsie su dieci sono occupate. Quale percentuale è libera?",
          "choices": [
            "60%",
            "40%",
            "4%",
            "6%"
          ],
          "why": "Свободны шесть дорожек из десяти. 6/10 = 60%."
        },
        {
          "id": "maths-3",
          "ask": "In un sacchetto con 3 palline rosse e 2 blu si pesca a caso. Probabilità di una rossa?",
          "choices": [
            "3/5",
            "2/3",
            "3/2",
            "1/5"
          ],
          "why": "Из пяти равновозможных шаров три красные."
        },
        {
          "id": "maths-4",
          "ask": "Un percorso di 1,8 km equivale a…",
          "choices": [
            "1800 m",
            "180 m",
            "18 m",
            "18 000 m"
          ],
          "why": "В километре 1000 метров. 1,8 × 1000 = 1800."
        },
        {
          "id": "maths-5",
          "ask": "Un prezzo di 80 euro scende del 15%. Qual è il nuovo prezzo?",
          "choices": [
            "68 euro",
            "65 euro",
            "72 euro",
            "12 euro"
          ],
          "why": "Скидка равна 12 евро. Вычитаем её из 80."
        },
        {
          "id": "maths-6",
          "ask": "Da 3 palline rosse e 2 blu si estrae una rossa senza rimetterla. Probabilità di pescare ora una blu?",
          "choices": [
            "1/2",
            "2/5",
            "3/4",
            "1/5"
          ],
          "why": "В мешке осталось четыре шара, из них два синих. 2/4 = 1/2."
        }
      ]
    },
    {
      "id": "motion",
      "group": 2,
      "name": "Скорость, сила и работа",
      "it": "Velocità, forza e lavoro",
      "word": "la forza risultante",
      "translation": "равнодействующая сила",
      "rule": "Средняя путевая скорость равна всему пути, делённому на всё время. Ускорение показывает, насколько меняется скорость за секунду. Связь силы и ускорения записывают как F = ma.",
      "example": "Бегун преодолел 400 м за 80 с. Средняя скорость равна 5 м/с. Для перевода в км/ч умножь на 3,6 — получится 18 км/ч.",
      "refs": [
        "physics"
      ],
      "questions": [
        {
          "id": "motion-1",
          "ask": "Una ciclista percorre 600 m in 120 s. Qual è la velocità media in modulo su un tratto rettilineo senza inversioni?",
          "choices": [
            "5 m/s",
            "0,2 m/s",
            "50 m/s",
            "720 m/s"
          ],
          "why": "Делим 600 м на 120 с и получаем 5 м/с."
        },
        {
          "id": "motion-2",
          "ask": "Un corpo di 3 kg accelera di 2 m/s². Quanto vale la forza risultante?",
          "choices": [
            "6 N",
            "1,5 N",
            "5 N",
            "9 N"
          ],
          "why": "По второму закону Ньютона F = 3 × 2 = 6 ньютонов."
        },
        {
          "id": "motion-3",
          "ask": "La velocità cresce da 2 a 8 m/s in 3 s in linea retta, senza cambio di verso. Accelerazione media?",
          "choices": [
            "2 m/s²",
            "3 m/s²",
            "6 m/s²",
            "8 m/s²"
          ],
          "why": "Изменение скорости равно 6 м/с. Деление на 3 с даёт 2 м/с²."
        },
        {
          "id": "motion-4",
          "ask": "Qual è l’unità SI dell’energia?",
          "choices": [
            "Joule",
            "Newton",
            "Watt",
            "Pascal"
          ],
          "why": "Энергию и работу измеряют в джоулях. Ватт — единица мощности."
        },
        {
          "id": "motion-5",
          "ask": "Una forza costante di 10 N sposta un oggetto di 3 m nello stesso verso. Quanto lavoro compie?",
          "choices": [
            "30 J",
            "3 J",
            "13 J",
            "0 J"
          ],
          "why": "При совпадении направления силы и перемещения работа равна 10 × 3."
        },
        {
          "id": "motion-6",
          "ask": "A quanti km/h corrispondono 4 m/s?",
          "choices": [
            "14,4 km/h",
            "1,11 km/h",
            "40 km/h",
            "4 km/h"
          ],
          "why": "Чтобы перевести м/с в км/ч, умножь на 3,6."
        }
      ]
    },
    {
      "id": "chem",
      "group": 2,
      "name": "Растворы, атомы и pH",
      "it": "Soluzioni, atomi e pH",
      "word": "il soluto",
      "translation": "растворённое вещество",
      "rule": "Атомный номер равен числу протонов. В растворе различают растворитель и растворённое вещество. Массовая концентрация в г/л равна массе вещества в граммах, делённой на объём раствора в литрах.",
      "example": "Если 4 г соли содержатся в 0,5 л раствора, концентрация равна 8 г/л. При добавлении воды количество соли сохраняется, а концентрация падает.",
      "refs": [
        "chem"
      ],
      "questions": [
        {
          "id": "chem-1",
          "ask": "Che cosa indica il numero atomico?",
          "choices": [
            "Il numero di protoni",
            "La massa in grammi",
            "Il numero di neutroni sempre",
            "Il volume dell’atomo"
          ],
          "why": "Число протонов в ядре определяет химический элемент."
        },
        {
          "id": "chem-2",
          "ask": "Sciogliendo sale in acqua, il sale è…",
          "choices": [
            "il soluto",
            "il solvente",
            "il recipiente",
            "il vapore"
          ],
          "why": "Растворяемый компонент называют soluto, растворитель — solvente."
        },
        {
          "id": "chem-3",
          "ask": "Una soluzione di volume 0,25 L contiene 2 g di soluto. Concentrazione in massa?",
          "choices": [
            "8 g/L",
            "0,5 g/L",
            "2,25 g/L",
            "0,125 g/L"
          ],
          "why": "2 / 0,25 = 8 г/л."
        },
        {
          "id": "chem-4",
          "ask": "A 25 °C, quale valore di pH indica una soluzione acida?",
          "choices": [
            "pH 3",
            "pH 7",
            "pH 9",
            "pH 12"
          ],
          "why": "При 25 °C кислотной водной среде соответствует pH меньше 7."
        },
        {
          "id": "chem-5",
          "ask": "Aggiungendo acqua senza perdere soluto, la concentrazione del soluto…",
          "choices": [
            "diminuisce",
            "aumenta sempre",
            "rimane identica",
            "diventa subito zero"
          ],
          "why": "Количество растворённого вещества прежнее, а объём увеличился."
        },
        {
          "id": "chem-6",
          "ask": "Quale trasformazione è un cambiamento fisico?",
          "choices": [
            "La fusione del ghiaccio",
            "La combustione del metano",
            "La formazione di ruggine",
            "La combustione del carbonio"
          ],
          "why": "При таянии меняется агрегатное состояние воды, а её химический состав сохраняется."
        }
      ]
    }
  ]
};

