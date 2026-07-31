"""Generate catalog translations locally with the cached NLLB model.

This development script is intentionally not part of the production build. It
reads the extracted Russian workbook data and writes the committed translation
JSON consumed by the website and CMS seed.
"""

from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

from transformers import AutoModelForSeq2SeqLM, AutoTokenizer


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_PATH = PROJECT_ROOT / "src" / "data" / "catalog-source.ru.json"
CATALOG_PATH = PROJECT_ROOT / "src" / "data" / "catalog.generated.json"
OUTPUT_PATH = PROJECT_ROOT / "src" / "data" / "catalog-translations.generated.json"
MODEL_ID = "facebook/nllb-200-distilled-600M"
LANGUAGE_CODES = {
    "en": "eng_Latn",
    "uz": "uzn_Latn",
    "de": "deu_Latn",
}

NAME_TERMS = {
    "en": {
        "Пожарная автоцистерна повышенной проходимости": "All-terrain fire tanker",
        "Пожарный аварийно-спасательный подъёмник": "Fire and rescue aerial platform",
        "Пожарно-спасательный автомобиль": "Fire and rescue vehicle",
        "Автомобиль скорой медицинской помощи": "All-terrain ambulance",
        "Вездеходный тягач с КМУ и полуприцепом-вездеходом": "All-terrain tractor unit with loader crane and all-terrain semi-trailer",
        "Вездеходная спецмашина для перевозки взрывчатых веществ": "All-terrain explosive-material transport vehicle",
        "Вездеходный прицеп-трубовоз для буровых труб": "All-terrain drilling-pipe trailer",
        "Передвижная автомастерская на вездеходном шасси": "Mobile workshop on all-terrain chassis",
        "Геологоразведочная буровая установка ЗИФ": "ZIF geological exploration drilling rig",
        "Гидродинамическая каналопромывочная машина": "Hydrodynamic sewer jetting truck",
        "Комбинированная дорожная машина-пескоразбрасыватель": "Combined road maintenance and grit-spreading truck",
        "Вездеходный водовоз для питьевой и технической воды": "All-terrain potable and service water tanker",
        "Водовоз для питьевой и технической воды": "Potable and service water tanker",
        "Многосекционная маслостанция для карьерной техники": "Multi-section hydraulic power unit for mining machinery",
        "Патрульный автомобиль для охраны общественного порядка": "Public-safety patrol vehicle",
        "Передвижная криминалистическая лаборатория": "Mobile forensic laboratory",
        "Передвижная ремонтная мастерская с КМУ": "Mobile repair workshop with loader crane",
        "Передвижная авторемонтная мастерская": "Mobile vehicle repair workshop",
        "Передвижная ремонтная мастерская": "Mobile repair workshop",
        "Передвижная автомастерская ПАРМ": "PARM mobile workshop",
        "Вахтовый автобус": "Crew transport bus",
        "Пятиосный низкорамный полуприцеп-тяжеловоз": "Five-axle low-bed heavy-haul semi-trailer",
        "Четырёхосный полуприцеп-тяжеловоз": "Four-axle heavy-haul semi-trailer",
        "Трёхосный низкорамный полуприцеп": "Three-axle low-bed semi-trailer",
        "Бортовой полуприцеп-контейнеровоз": "Flatbed container semi-trailer",
        "Тентованный грузовой автомобиль": "Curtain-side cargo truck",
        "Бортовой автомобиль с тентом": "Flatbed truck with tarpaulin",
        "Автофургон промтоварный": "Dry-goods box truck",
        "Компактный промтоварный автофургон": "Compact dry-goods box truck",
        "Компактный бортовой автомобиль": "Compact flatbed truck",
        "Бортовой автомобиль": "Flatbed truck",
        "Вакуумная подметально-уборочная машина": "Vacuum road sweeper",
        "Мусоровоз с задней загрузкой": "Rear-loading refuse truck",
        "Поливооросительная машина для карьеров": "Mining-site water-spraying truck",
        "Поливомоечная машина": "Street washing truck",
        "Комбинированная дорожная машина": "Combined road maintenance truck",
        "Автогудронатор": "Bitumen distributor truck",
        "Автоцистерна-кислотовоз": "Acid tanker truck",
        "Вездеходный бензовоз / автотопливозаправщик": "All-terrain fuel tanker / refueller",
        "Бензовоз / автотопливозаправщик": "Fuel tanker / refueller",
        "Компактный автотопливозаправщик": "Compact refuelling truck",
        "Прицепной автотопливозаправщик": "Fuel-bowser trailer",
        "Полуприцеп-бензовоз": "Fuel tank semi-trailer",
        "Полуприцеп-битумовоз": "Bitumen tank semi-trailer",
        "Полуприцеп-кислотовоз": "Acid tank semi-trailer",
        "Самосвальный полуприцеп": "Tipper semi-trailer",
        "Прицеп-цистерна для питьевой воды": "Potable-water tank trailer",
        "Магнитно-грейферный кран": "Magnetic grab crane",
        "Мостовой кран": "Overhead bridge crane",
        "Козловой кран": "Gantry crane",
        "Пожарная автолестница": "Firefighting aerial ladder",
        "Пожарная автоцистерна": "Fire tanker",
        "Автомобиль для конвоирования": "Prisoner transport vehicle",
        "Установка «ДОН» для спуска и подъёма насосного оборудования": "DON unit for lowering and lifting pump equipment",
        "Прицепная буровая установка": "Trailer-mounted drilling rig",
        "Буровая установка": "Drilling rig",
        "Бур-ямокопатель": "Earth auger",
        "Автокран самоходный": "Self-propelled truck crane",
        "Автокран вездеход": "All-terrain truck crane",
        "Автокран": "Truck crane",
        "Кран-манипулятор с платформой для контейнера": "Loader crane with container platform",
        "Кран-манипулятор": "Loader crane",
        "Автовышка": "Truck-mounted aerial platform",
        "Самосвал": "Dump truck",
        "Мультилифт": "Hook-lift truck",
        "Компактный": "Compact",
        "герметичный контейнер": "sealed container",
        "вакуумная цистерна": "vacuum tank",
        "открытый контейнер": "open container",
        "контейнер-компактор": "compactor container",
        "на шасси": "on chassis",
        "с КМУ": "with loader crane",
    },
    "uz": {
        "Пожарная автоцистерна повышенной проходимости": "Yuqori o'tuvchan yong'in o'chirish avtosisterinasi",
        "Пожарный аварийно-спасательный подъёмник": "Yong'in va qutqaruv avtokotargichi",
        "Пожарно-спасательный автомобиль": "Yong'in va qutqaruv avtomobili",
        "Автомобиль скорой медицинской помощи": "Yuqori o'tuvchan tez yordam avtomobili",
        "Вездеходный тягач с КМУ и полуприцепом-вездеходом": "Kran-manipulyatorli va yuqori o'tuvchan yarim tirkamali tyagach",
        "Вездеходная спецмашина для перевозки взрывчатых веществ": "Portlovchi moddalarni tashish uchun yuqori o'tuvchan maxsus avtomobil",
        "Вездеходный прицеп-трубовоз для буровых труб": "Burg'ilash quvurlari uchun yuqori o'tuvchan tirkama",
        "Передвижная автомастерская на вездеходном шасси": "Yuqori o'tuvchan shassidagi ko'chma ustaxona",
        "Геологоразведочная буровая установка ЗИФ": "ZIF geologik qidiruv burg'ilash qurilmasi",
        "Гидродинамическая каналопромывочная машина": "Gidrodinamik kanal yuvish avtomobili",
        "Комбинированная дорожная машина-пескоразбрасыватель": "Qum sepgichli kombinatsiyalangan yo'l mashinasi",
        "Вездеходный водовоз для питьевой и технической воды": "Ichimlik va texnik suv uchun yuqori o'tuvchan avtosisterina",
        "Водовоз для питьевой и технической воды": "Ichimlik va texnik suv avtosisterinasi",
        "Многосекционная маслостанция для карьерной техники": "Kon texnikasi uchun ko'p seksiyali gidravlik moy stansiyasi",
        "Патрульный автомобиль для охраны общественного порядка": "Jamoat tartibini saqlash patrul avtomobili",
        "Передвижная криминалистическая лаборатория": "Ko'chma kriminalistika laboratoriyasi",
        "Передвижная ремонтная мастерская с КМУ": "Kran-manipulyatorli ko'chma ta'mirlash ustaxonasi",
        "Передвижная авторемонтная мастерская": "Ko'chma avtomobil ta'mirlash ustaxonasi",
        "Передвижная ремонтная мастерская": "Ko'chma ta'mirlash ustaxonasi",
        "Передвижная автомастерская ПАРМ": "PARM ko'chma ustaxonasi",
        "Вахтовый автобус": "Vaxta avtobusi",
        "Пятиосный низкорамный полуприцеп-тяжеловоз": "Besh o'qli past ramali og'ir yuk yarim tirkamasi",
        "Четырёхосный полуприцеп-тяжеловоз": "To'rt o'qli og'ir yuk yarim tirkamasi",
        "Трёхосный низкорамный полуприцеп": "Uch o'qli past ramali yarim tirkama",
        "Бортовой полуприцеп-контейнеровоз": "Konteyner tashuvchi bortli yarim tirkama",
        "Тентованный грузовой автомобиль": "Tentli yuk avtomobili",
        "Бортовой автомобиль с тентом": "Tentli bortli avtomobil",
        "Автофургон промтоварный": "Sanoat mollari uchun avtofurgon",
        "Компактный промтоварный автофургон": "Ixcham sanoat mollari avtofurgoni",
        "Компактный бортовой автомобиль": "Ixcham bortli avtomobil",
        "Бортовой автомобиль": "Bortli avtomobil",
        "Вакуумная подметально-уборочная машина": "Vakuumli yo'l supurish mashinasi",
        "Мусоровоз с задней загрузкой": "Orqadan yuklanadigan chiqindi tashish avtomobili",
        "Поливооросительная машина для карьеров": "Konlar uchun suv sepish avtomobili",
        "Поливомоечная машина": "Yo'l yuvish avtomobili",
        "Комбинированная дорожная машина": "Kombinatsiyalangan yo'l mashinasi",
        "Автогудронатор": "Avtogudronator",
        "Автоцистерна-кислотовоз": "Kislota tashuvchi avtosisterina",
        "Вездеходный бензовоз / автотопливозаправщик": "Yuqori o'tuvchan yoqilg'i tashuvchi / yoqilg'i quyish avtomobili",
        "Бензовоз / автотопливозаправщик": "Yoqilg'i tashuvchi / yoqilg'i quyish avtomobili",
        "Компактный автотопливозаправщик": "Ixcham yoqilg'i quyish avtomobili",
        "Прицепной автотопливозаправщик": "Tirkama yoqilg'i quyish qurilmasi",
        "Полуприцеп-бензовоз": "Yoqilg'i tashuvchi yarim tirkama",
        "Полуприцеп-битумовоз": "Bitum tashuvchi yarim tirkama",
        "Полуприцеп-кислотовоз": "Kislota tashuvchi yarim tirkama",
        "Самосвальный полуприцеп": "Samosval yarim tirkama",
        "Прицеп-цистерна для питьевой воды": "Ichimlik suvi uchun sisterinali tirkama",
        "Магнитно-грейферный кран": "Magnit-greyferli kran",
        "Мостовой кран": "Ko'prikli kran",
        "Козловой кран": "Portal kran",
        "Пожарная автолестница": "Yong'in o'chirish avtonarvoni",
        "Пожарная автоцистерна": "Yong'in o'chirish avtosisterinasi",
        "Автомобиль для конвоирования": "Konvoy avtomobili",
        "Установка «ДОН» для спуска и подъёма насосного оборудования": "Nasos uskunasini tushirish va ko'tarish uchun DON qurilmasi",
        "Прицепная буровая установка": "Tirkama burg'ilash qurilmasi",
        "Буровая установка": "Burg'ilash qurilmasi",
        "Бур-ямокопатель": "Chuqur qazuvchi burg'u",
        "Автокран самоходный": "O'ziyurar avtokran",
        "Автокран вездеход": "Yuqori o'tuvchan avtokran",
        "Автокран": "Avtokran",
        "Кран-манипулятор с платформой для контейнера": "Konteyner platformali kran-manipulyator",
        "Кран-манипулятор": "Kran-manipulyator",
        "Автовышка": "Avtokotargich",
        "Самосвал": "Samosval",
        "Мультилифт": "Multilift",
        "герметичный контейнер": "germetik konteyner",
        "вакуумная цистерна": "vakuum sisterina",
        "открытый контейнер": "ochiq konteyner",
        "контейнер-компактор": "kompaktor konteyner",
        "на шасси": "shassida",
        "с КМУ": "kran-manipulyator bilan",
    },
    "de": {
        "Пожарная автоцистерна повышенной проходимости": "Geländegängiges Tanklöschfahrzeug",
        "Пожарный аварийно-спасательный подъёмник": "Feuerwehr- und Rettungshubarbeitsbühne",
        "Пожарно-спасательный автомобиль": "Feuerwehr- und Rettungsfahrzeug",
        "Автомобиль скорой медицинской помощи": "Geländegängiger Krankenwagen",
        "Вездеходный тягач с КМУ и полуприцепом-вездеходом": "Geländegängige Sattelzugmaschine mit Ladekran und Geländeauflieger",
        "Вездеходная спецмашина для перевозки взрывчатых веществ": "Geländegängiges Sonderfahrzeug für Explosivstoffe",
        "Вездеходный прицеп-трубовоз для буровых труб": "Geländegängiger Bohrrohranhänger",
        "Передвижная автомастерская на вездеходном шасси": "Mobile Werkstatt auf Geländefahrgestell",
        "Геологоразведочная буровая установка ЗИФ": "Geologische Erkundungsbohranlage ZIF",
        "Гидродинамическая каналопромывочная машина": "Hydrodynamisches Kanalspülfahrzeug",
        "Комбинированная дорожная машина-пескоразбрасыватель": "Kombiniertes Straßenunterhaltungs- und Streufahrzeug",
        "Вездеходный водовоз для питьевой и технической воды": "Geländegängiger Trink- und Brauchwassertankwagen",
        "Водовоз для питьевой и технической воды": "Trink- und Brauchwassertankwagen",
        "Многосекционная маслостанция для карьерной техники": "Mehrteilige Hydraulikstation für Bergbaumaschinen",
        "Патрульный автомобиль для охраны общественного порядка": "Streifenfahrzeug für öffentliche Sicherheit",
        "Передвижная криминалистическая лаборатория": "Mobiles forensisches Labor",
        "Передвижная ремонтная мастерская с КМУ": "Mobile Reparaturwerkstatt mit Ladekran",
        "Передвижная авторемонтная мастерская": "Mobile Fahrzeugwerkstatt",
        "Передвижная ремонтная мастерская": "Mobile Reparaturwerkstatt",
        "Передвижная автомастерская ПАРМ": "Mobile Werkstatt PARM",
        "Вахтовый автобус": "Mannschaftsbus",
        "Пятиосный низкорамный полуприцеп-тяжеловоз": "Fünfachsiger Schwerlast-Tiefbettauflieger",
        "Четырёхосный полуприцеп-тяжеловоз": "Vierachsiger Schwerlastauflieger",
        "Трёхосный низкорамный полуприцеп": "Dreiachsiger Tiefbettauflieger",
        "Бортовой полуприцеп-контейнеровоз": "Container-Pritschenauflieger",
        "Тентованный грузовой автомобиль": "Planen-Lkw",
        "Бортовой автомобиль с тентом": "Pritschenwagen mit Plane",
        "Автофургон промтоварный": "Trockenfracht-Kofferfahrzeug",
        "Компактный промтоварный автофургон": "Kompaktes Trockenfracht-Kofferfahrzeug",
        "Компактный бортовой автомобиль": "Kompakter Pritschenwagen",
        "Бортовой автомобиль": "Pritschenwagen",
        "Вакуумная подметально-уборочная машина": "Vakuum-Kehrmaschine",
        "Мусоровоз с задней загрузкой": "Hecklader-Abfallsammelfahrzeug",
        "Поливооросительная машина для карьеров": "Wassersprühfahrzeug für Tagebaue",
        "Поливомоечная машина": "Straßenwaschfahrzeug",
        "Комбинированная дорожная машина": "Kombiniertes Straßenunterhaltungsfahrzeug",
        "Автогудронатор": "Bitumenspritzfahrzeug",
        "Автоцистерна-кислотовоз": "Säuretankwagen",
        "Вездеходный бензовоз / автотопливозаправщик": "Geländegängiger Kraftstofftankwagen / Betankungsfahrzeug",
        "Бензовоз / автотопливозаправщик": "Kraftstofftankwagen / Betankungsfahrzeug",
        "Компактный автотопливозаправщик": "Kompaktes Betankungsfahrzeug",
        "Прицепной автотопливозаправщик": "Betankungsanhänger",
        "Полуприцеп-бензовоз": "Kraftstofftankauflieger",
        "Полуприцеп-битумовоз": "Bitumentankauflieger",
        "Полуприцеп-кислотовоз": "Säuretankauflieger",
        "Самосвальный полуприцеп": "Kippauflieger",
        "Прицеп-цистерна для питьевой воды": "Trinkwassertankanhänger",
        "Магнитно-грейферный кран": "Magnet-Greiferkran",
        "Мостовой кран": "Brückenkran",
        "Козловой кран": "Portalkran",
        "Пожарная автолестница": "Feuerwehr-Drehleiter",
        "Пожарная автоцистерна": "Tanklöschfahrzeug",
        "Автомобиль для конвоирования": "Gefangenentransportfahrzeug",
        "Установка «ДОН» для спуска и подъёма насосного оборудования": "DON-Anlage zum Absenken und Heben von Pumpenausrüstung",
        "Прицепная буровая установка": "Anhängerbohranlage",
        "Буровая установка": "Bohranlage",
        "Бур-ямокопатель": "Erdbohrer",
        "Автокран самоходный": "Selbstfahrender Autokran",
        "Автокран вездеход": "Geländegängiger Autokran",
        "Автокран": "Autokran",
        "Кран-манипулятор с платформой для контейнера": "Ladekran mit Containerplattform",
        "Кран-манипулятор": "Ladekran",
        "Автовышка": "Lkw-Hubarbeitsbühne",
        "Самосвал": "Kipper",
        "Мультилифт": "Abrollkipper",
        "герметичный контейнер": "geschlossener Container",
        "вакуумная цистерна": "Vakuumtank",
        "открытый контейнер": "offener Container",
        "контейнер-компактор": "Presscontainer",
        "на шасси": "auf Fahrgestell",
        "с КМУ": "mit Ladekran",
    },
}

NAME_ROW_OVERRIDES = {
    "en": {
        16: "Earth auger Ø350 mm with 6.3 t loader crane",
        25: "Drilling rig URB-50 / URB-70 — 8×8",
        26: "Drilling rig URB-20 / URB-25 / URB-30 — 6×6",
        68: "Street washing truck PM-4.5",
        104: "Nurafshon 80C — 76 cm row spacing",
    },
    "uz": {
        16: "6,3 t kran-manipulyatorli Ø350 mm chuqur qazuvchi burg'u",
        25: "URB-50 / URB-70 burg'ilash qurilmasi — 8×8",
        26: "URB-20 / URB-25 / URB-30 burg'ilash qurilmasi — 6×6",
        68: "PM-4,5 yo'l yuvish avtomobili",
        104: "Nurafshon 80C — 76 sm qator oralig'i",
    },
    "de": {
        16: "Erdbohrer Ø350 mm mit 6,3-t-Ladekran",
        25: "Bohranlage URB-50 / URB-70 — 8×8",
        26: "Bohranlage URB-20 / URB-25 / URB-30 — 6×6",
        68: "Straßenwaschfahrzeug PM-4,5",
        104: "Nurafshon 80C — 76 cm Reihenabstand",
    },
}

SPEC_LABELS = {
    "Максимальная грузоподъёмность": ("Maximum lifting capacity", "Maksimal yuk ko'tarish quvvati", "Maximale Tragfähigkeit"),
    "Максимальная грузоподъёмность по спецификации": ("Rated lifting capacity", "Nominal yuk ko'tarish quvvati", "Nenntragfähigkeit"),
    "Грузоподъёмность": ("Payload", "Yuk ko'tarish quvvati", "Nutzlast"),
    "Грузоподъёмность платформы": ("Platform payload", "Platforma yuk ko'tarish quvvati", "Plattformnutzlast"),
    "Грузоподъёмность корзины": ("Basket capacity", "Savatcha yuk ko'tarish quvvati", "Korbtragfähigkeit"),
    "Грузоподъёмность КМУ": ("Loader-crane capacity", "Kran-manipulyator yuk ko'tarish quvvati", "Tragfähigkeit des Ladekrans"),
    "Грузоподъёмность крюкового погрузчика": ("Hook-lift capacity", "Kryukli yuklagich quvvati", "Tragfähigkeit des Abrollkippers"),
    "Грузоподъёмность при максимальной длине стрелы": ("Capacity at maximum boom length", "Strelaning maksimal uzunligidagi yuk ko'tarish quvvati", "Tragfähigkeit bei maximaler Auslegerlänge"),
    "Грузоподъёмность по каталогу": ("Rated payload", "Katalog bo'yicha yuk ko'tarish quvvati", "Nennnutzlast"),
    "Масса перевозимого груза": ("Payload", "Tashiladigan yuk massasi", "Nutzlast"),
    "Масса перевозимого груза по каталогу": ("Rated payload", "Katalog bo'yicha yuk massasi", "Nennnutzlast"),
    "Полная масса": ("Gross vehicle weight", "To'liq massa", "Gesamtgewicht"),
    "Допустимая полная масса": ("Permissible gross weight", "Ruxsat etilgan to'liq massa", "Zulässiges Gesamtgewicht"),
    "Снаряжённая масса автомобиля без контейнера": ("Kerb weight without container", "Konteynersiz avtomobilning jihozlangan massasi", "Leergewicht ohne Container"),
    "Снаряжённая масса полуприцепа": ("Semi-trailer kerb weight", "Yarim tirkamaning jihozlangan massasi", "Leergewicht des Aufliegers"),
    "Варианты базового шасси": ("Base chassis options", "Bazaviy shassi variantlari", "Optionen für das Basisfahrgestell"),
    "Базовые шасси": ("Base chassis", "Bazaviy shassi", "Basisfahrgestell"),
    "Базовое исполнение": ("Base configuration", "Bazaviy ijro", "Basisausführung"),
    "Колёсная формула": ("Wheel configuration", "G'ildirak formulasi", "Radformel"),
    "Колесная формула": ("Wheel configuration", "G'ildirak formulasi", "Radformel"),
    "Колесная база": ("Wheelbase", "G'ildirak bazasi", "Radstand"),
    "Двигатель": ("Engine", "Dvigatel", "Motor"),
    "Двигатель, Л": ("Engine", "Dvigatel", "Motor"),
    "Объём двигателя": ("Engine displacement", "Dvigatel hajmi", "Hubraum"),
    "Объём двигателя, Л": ("Engine displacement, L", "Dvigatel hajmi, L", "Hubraum, L"),
    "Мощность двигателя": ("Engine power", "Dvigatel quvvati", "Motorleistung"),
    "Мощность, л.с./кВт": ("Power, hp/kW", "Quvvat, ot kuchi/kVt", "Leistung, PS/kW"),
    "Коробка передач": ("Transmission", "Uzatmalar qutisi", "Getriebe"),
    "Число передач, вперёд/назад": ("Gears, forward/reverse", "Uzatmalar soni, oldinga/orqaga", "Gänge, vorwärts/rückwärts"),
    "ВОМ": ("PTO", "Quvvat olish vali", "Zapfwelle"),
    "Максимальная скорость": ("Maximum speed", "Maksimal tezlik", "Höchstgeschwindigkeit"),
    "Рабочая зона": ("Working range", "Ish zonasi", "Arbeitsbereich"),
    "Рабочая высота": ("Working height", "Ish balandligi", "Arbeitshöhe"),
    "Рабочая температура": ("Operating temperature", "Ish harorati", "Betriebstemperatur"),
    "Максимальная высота подъёма": ("Maximum lifting height", "Maksimal ko'tarish balandligi", "Maximale Hubhöhe"),
    "Высота подъёма": ("Lifting height", "Ko'tarish balandligi", "Hubhöhe"),
    "Максимальный рабочий радиус": ("Maximum working radius", "Maksimal ish radiusi", "Maximaler Arbeitsradius"),
    "Грузовой момент": ("Load moment", "Yuk momenti", "Lastmoment"),
    "Максимальный грузовой момент": ("Maximum load moment", "Maksimal yuk momenti", "Maximales Lastmoment"),
    "Угол поворота": ("Slewing angle", "Burilish burchagi", "Schwenkwinkel"),
    "Объём цистерны": ("Tank volume", "Sisterina hajmi", "Tankvolumen"),
    "Варианты объёма цистерны": ("Tank volume options", "Sisterina hajmi variantlari", "Tankvolumenoptionen"),
    "Объём цистерны для воды": ("Water tank volume", "Suv sisterinasi hajmi", "Wassertankvolumen"),
    "Объём кузова": ("Body volume", "Kuzov hajmi", "Aufbauvolumen"),
    "Объём контейнера": ("Container volume", "Konteyner hajmi", "Containervolumen"),
    "Объём загрузочного бункера": ("Hopper volume", "Yuklash bunkeri hajmi", "Behältervolumen"),
    "Производительность насоса": ("Pump capacity", "Nasos unumdorligi", "Pumpenleistung"),
    "Насос высокого давления": ("High-pressure pump", "Yuqori bosimli nasos", "Hochdruckpumpe"),
    "Время самослива": ("Gravity discharge time", "O'z-o'zidan bo'shatish vaqti", "Schwerkraft-Entleerzeit"),
    "Количество отсеков": ("Number of compartments", "Bo'limlar soni", "Anzahl der Kammern"),
    "Количество осей": ("Number of axles", "O'qlar soni", "Anzahl der Achsen"),
    "Вместимость экипажа": ("Crew capacity", "Ekipaj sig'imi", "Besatzungskapazität"),
    "Пассажировместимость": ("Passenger capacity", "Yo'lovchi sig'imi", "Fahrgastkapazität"),
    "Габаритные размеры": ("Overall dimensions", "Gabarit o'lchamlari", "Gesamtabmessungen"),
    "Габариты": ("Dimensions", "O'lchamlar", "Abmessungen"),
    "Внутренние размеры кузова": ("Internal body dimensions", "Kuzovning ichki o'lchamlari", "Innenabmessungen des Aufbaus"),
    "Размеры платформы": ("Platform dimensions", "Platforma o'lchamlari", "Plattformabmessungen"),
    "Ширина погрузочной платформы": ("Loading platform width", "Yuklash platformasi kengligi", "Breite der Ladeplattform"),
    "Длина": ("Length", "Uzunlik", "Länge"),
    "Ширина": ("Width", "Kenglik", "Breite"),
    "Высота": ("Height", "Balandlik", "Höhe"),
    "Глубина бурения": ("Drilling depth", "Burg'ilash chuqurligi", "Bohrtiefe"),
    "Максимальная глубина бурения": ("Maximum drilling depth", "Maksimal burg'ilash chuqurligi", "Maximale Bohrtiefe"),
    "Диаметр бурения": ("Drilling diameter", "Burg'ilash diametri", "Bohrdurchmesser"),
    "Диаметр бурильных труб": ("Drill-pipe diameter", "Burg'ilash quvuri diametri", "Bohrrohrdurchmesser"),
    "Диаметры бурильных труб": ("Drill-pipe diameters", "Burg'ilash quvurlari diametri", "Bohrrohrdurchmesser"),
    "Максимальная высота всасывания": ("Maximum suction height", "Maksimal so'rish balandligi", "Maximale Saughöhe"),
    "Глубина всасывания воды": ("Water suction depth", "Suv so'rish chuqurligi", "Wasser-Saugtiefe"),
    "Ширина полива": ("Spraying width", "Suv sepish kengligi", "Sprühbreite"),
    "Ширина распределения": ("Spreading width", "Sepish kengligi", "Streubreite"),
    "Дальность подачи воды": ("Water throw range", "Suv uzatish masofasi", "Wurfweite"),
    "Нагрузка на ССУ": ("Fifth-wheel load", "Egar qurilmasiga tushadigan yuk", "Sattellast"),
    "Топливный бак": ("Fuel tank", "Yoqilg'i baki", "Kraftstofftank"),
    "Шины": ("Tyres", "Shinalar", "Reifen"),
    "Междурядье": ("Row spacing", "Qator oralig'i", "Reihenabstand"),
    "Имеется субсидия в размере 15%": ("15% subsidy available", "15% subsidiya mavjud", "15% Förderung verfügbar"),
}


def split_lines(value: str) -> list[str]:
    return [line.strip() for line in str(value or "").splitlines() if line.strip()]


def normalize_russian(value: str, row: int, *, is_name: bool = False) -> str:
    replacements = {
        "Обьём двигатела": "Объём двигателя",
        "Мошноста Л,С/кВт": "Мощность, л.с./кВт",
        "Число передач. Вперед/Назад": "Число передач, вперёд/назад",
        "3k2": "3×2",
        "76см": "76 см",
        "шасси:KRANTAS": "шасси: KRANTAS",
        "  ": " ",
    }
    result = value
    for source, target in replacements.items():
        result = result.replace(source, target)

    row_name_overrides = {
        48: "Мультилифт 25 / 27 т — герметичный контейнер / вакуумная цистерна",
        49: "Мультилифт 25 / 27 т — открытый контейнер / контейнер-компактор",
        99: "John Deere 6140B",
        104: "Nurafshon 80C — междурядье 76 см",
    }
    if is_name and row in row_name_overrides:
        result = row_name_overrides[row]
    return result.strip()


def clean_translation(value: str, language: str) -> str:
    result = value.strip()
    result = re.sub(r"\s+([,.:;/)])", r"\1", result)
    result = re.sub(r"([(])\s+", r"\1", result)
    result = re.sub(r"\s+([–—-])\s+", r" \1 ", result)
    result = re.sub(r"\s+", " ", result)

    if language == "uz":
        result = re.sub(r"\s*'\s*", "'", result)
        replacements = {
            "KRANTAS guruhi": "KRANTAS Group",
            "avtokran": "avtokran",
            "yuk ko'tarishning maksimal hajmi": "maksimal yuk ko'tarish quvvati",
            "tonna": "t",
            "kub metr": "m³",
        }
    elif language == "en":
        replacements = {
            "truck tap": "truck crane",
            "car crane": "truck crane",
            "automotive crane": "truck crane",
            "fuel carrier": "fuel tanker",
            "water carrier": "water tanker",
        }
    else:
        replacements = {
            "Autokran": "Autokran",
            "Kraftstoffträger": "Tankfahrzeug",
        }

    for source, target in replacements.items():
        result = result.replace(source, target)
    return result


def translate_product_name(source: str, language: str, fallback: str) -> str:
    if not re.search(r"[А-Яа-яЁё]", source):
        return source

    result = source
    for russian, translated in sorted(
        NAME_TERMS[language].items(),
        key=lambda item: len(item[0]),
        reverse=True,
    ):
        result = result.replace(russian, translated)

    code_replacements = {
        "КМУ": "loader crane" if language == "en" else "kran-manipulyator" if language == "uz" else "Ladekran",
        "АТЗ": "ATZ",
        "АЦ": "AC",
        "ПАРМ": "PARM",
        "ЗИФ": "ZIF",
    }
    for source_code, target_code in code_replacements.items():
        result = result.replace(source_code, target_code)

    common_replacements = {
        "en": {
            "кузов пикап": "pickup body",
            "закрытый кузов": "closed body",
            "полуприцеп/вездеход": "semi-trailer / all-terrain configuration",
            "полуприцеп": "semi-trailer",
            "вездеход": "all-terrain",
            "контейнер": "container",
            "тн": "t",
            "т": "t",
            "м³": "m³",
            "мм": "mm",
            "м": "m",
        },
        "uz": {
            "кузов пикап": "pikap kuzovi",
            "закрытый кузов": "yopiq kuzov",
            "полуприцеп/вездеход": "yarim tirkama / yuqori o'tuvchan variant",
            "полуприцеп": "yarim tirkama",
            "вездеход": "yuqori o'tuvchan",
            "контейнер": "konteyner",
            "тн": "t",
            "т": "t",
            "м³": "m³",
            "мм": "mm",
            "м": "m",
        },
        "de": {
            "кузов пикап": "Pickup-Aufbau",
            "закрытый кузов": "geschlossener Aufbau",
            "полуприцеп/вездеход": "Auflieger / Geländeausführung",
            "полуприцеп": "Auflieger",
            "вездеход": "Geländeausführung",
            "контейнер": "Container",
            "тн": "t",
            "т": "t",
            "м³": "m³",
            "мм": "mm",
            "м": "m",
        },
    }
    for russian, translated in sorted(
        common_replacements[language].items(),
        key=lambda item: len(item[0]),
        reverse=True,
    ):
        result = result.replace(russian, translated)

    candidate = clean_translation(result, language)
    if re.search(r"[А-Яа-яЁё]", candidate):
        candidate = restore_numeric_ranges(source, fallback)
    return restore_numeric_ranges(source, candidate)


def restore_numeric_ranges(source: str, translated: str) -> str:
    range_pattern = re.compile(
        r"\d(?:[\d ]*\d)?(?:[.,]\d+)?\s*[–—-]\s*\d(?:[\d ]*\d)?(?:[.,]\d+)?"
    )
    result = translated
    for match in range_pattern.finditer(source):
        source_range = match.group(0)
        left, right = re.split(r"\s*[–—-]\s*", source_range, maxsplit=1)
        target_pattern = re.compile(
            rf"{re.escape(left).replace(r'\ ', r'\s*')}\s*[–—-]?\s*"
            rf"{re.escape(right).replace(r'\ ', r'\s*')}"
        )
        result, count = target_pattern.subn(source_range, result, count=1)
        if count == 0:
            compact_pattern = re.compile(
                rf"{re.escape(left.replace(' ', ''))}{re.escape(right.replace(' ', ''))}"
            )
            result = compact_pattern.sub(source_range, result, count=1)
    return result.replace("m3", "m³").replace("m2", "m²")


def apply_spec_label(source: str, translated: str, language: str) -> str:
    source_separator = ":" if ":" in source else " - " if " - " in source else ""
    if not source_separator:
        return translated

    source_label = source.split(source_separator, 1)[0].strip()
    labels = SPEC_LABELS.get(source_label)
    if not labels:
        return translated

    translated_label = labels[{"en": 0, "uz": 1, "de": 2}[language]]
    if ":" in translated:
        translated_value = translated.split(":", 1)[1].strip()
    elif re.search(r"\s+-\s+", translated):
        translated_value = re.split(r"\s+-\s+", translated, maxsplit=1)[1].strip()
    else:
        translated_value = source.split(source_separator, 1)[1].strip()
        if language != "ru":
            translated_value = translated_value.replace("Д-", "D-")

    separator = ": " if source_separator == ":" else " - "
    return f"{translated_label}{separator}{translated_value}"


def clean_existing_output(
    source_rows: list[dict],
    catalog: dict,
    output: dict,
) -> None:
    for source_row, product in zip(source_rows, catalog["products"], strict=True):
        row = source_row["row"]
        normalized_name = normalize_russian(source_row["name"], row, is_name=True)
        source_specs = [
            normalize_russian(line, row)
            for line in split_lines(source_row.get("specs", ""))
        ]
        source_features = [
            normalize_russian(line, row)
            for line in split_lines(source_row.get("equipment", ""))
        ]

        for language in ("en", "ru", "uz", "de"):
            localized = output[language]["productsData"][product["id"]]
            if language == "ru":
                localized["name"] = normalized_name
                localized["specs"] = {
                    f"detail{index + 1:02}": value
                    for index, value in enumerate(source_specs)
                }
                localized["features"] = source_features
            else:
                localized["name"] = NAME_ROW_OVERRIDES[language].get(
                    row,
                    translate_product_name(
                        normalized_name,
                        language,
                        localized["name"],
                    ),
                )
                localized["specs"] = {
                    key: apply_spec_label(
                        source,
                        restore_numeric_ranges(source, localized["specs"][key]),
                        language,
                    )
                    for key, source in zip(localized["specs"], source_specs, strict=True)
                }
                localized["features"] = [
                    restore_numeric_ranges(source, translated)
                    for source, translated in zip(
                        source_features,
                        localized["features"],
                        strict=True,
                    )
                ]

            description, full_description = build_descriptions(localized["name"], language)
            localized["description"] = description
            localized["fullDescription"] = full_description


def translate_batch(
    texts: list[str],
    tokenizer: AutoTokenizer,
    model: AutoModelForSeq2SeqLM,
    target_code: str,
    language: str,
) -> list[str]:
    translated: list[str] = []
    for offset in range(0, len(texts), 12):
        batch = texts[offset : offset + 12]
        encoded = tokenizer(
            batch,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=256,
        )
        generated = model.generate(
            **encoded,
            forced_bos_token_id=tokenizer.convert_tokens_to_ids(target_code),
            max_new_tokens=256,
            num_beams=2,
        )
        translated.extend(
            clean_translation(value, language)
            for value in tokenizer.batch_decode(generated, skip_special_tokens=True)
        )
        print(
            f"{language}: {min(offset + len(batch), len(texts))}/{len(texts)}",
            flush=True,
        )
    return translated


def build_descriptions(name: str, language: str) -> tuple[str, str]:
    if language == "ru":
        return (
            f"{name} для профессиональных промышленных и транспортных задач.",
            f"{name} производства KRANTAS Group разработан для надёжной работы в сложных условиях эксплуатации. Комплектация и базовое шасси подбираются с учётом требований заказчика.",
        )
    if language == "uz":
        return (
            f"{name} professional sanoat va transport vazifalari uchun.",
            f"KRANTAS Group ishlab chiqargan {name} murakkab foydalanish sharoitlarida ishonchli ishlash uchun mo'ljallangan. Komplektatsiya va bazaviy shassi buyurtmachi talablariga muvofiq tanlanadi.",
        )
    if language == "de":
        return (
            f"{name} für professionelle Industrie- und Transportaufgaben.",
            f"{name} von KRANTAS Group ist für den zuverlässigen Einsatz unter anspruchsvollen Bedingungen ausgelegt. Ausstattung und Basisfahrgestell werden auf die Anforderungen des Kunden abgestimmt.",
        )
    return (
        f"{name} for professional industrial and transport operations.",
        f"{name} by KRANTAS Group is engineered for reliable work in demanding operating conditions. Equipment and base chassis are configured to the customer's requirements.",
    )


def main() -> None:
    source_rows = json.loads(SOURCE_PATH.read_text(encoding="utf-8"))
    catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
    current = json.loads(OUTPUT_PATH.read_text(encoding="utf-8"))

    if len(source_rows) != len(catalog["products"]):
        raise RuntimeError("Workbook rows and generated products are not aligned.")

    if "--clean-only" in sys.argv:
        clean_existing_output(source_rows, catalog, current)
        OUTPUT_PATH.write_text(
            json.dumps(current, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"Cleaned {OUTPUT_PATH}", flush=True)
        return

    normalized_rows = []
    all_texts: list[str] = []
    for row in source_rows:
        normalized = {
            "row": row["row"],
            "name": normalize_russian(row["name"], row["row"], is_name=True),
            "specs": [
                normalize_russian(line, row["row"])
                for line in split_lines(row.get("specs", ""))
            ],
            "features": [
                normalize_russian(line, row["row"])
                for line in split_lines(row.get("equipment", ""))
            ],
        }
        normalized_rows.append(normalized)
        all_texts.extend([normalized["name"], *normalized["specs"], *normalized["features"]])

    repair_argument = next(
        (argument for argument in sys.argv if argument.startswith("--repair-rows=")),
        "",
    )
    repair_rows = {
        int(value)
        for value in repair_argument.partition("=")[2].split(",")
        if value.strip().isdigit()
    }
    if repair_rows:
        all_texts = [
            value
            for row in normalized_rows
            if row["row"] in repair_rows
            for value in [*row["specs"], *row["features"]]
        ]

    unique_texts = list(dict.fromkeys(all_texts))
    print(f"Loading {MODEL_ID} for {len(unique_texts)} unique strings.", flush=True)
    tokenizer = AutoTokenizer.from_pretrained(
        MODEL_ID,
        src_lang="rus_Cyrl",
        local_files_only=True,
    )
    model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_ID, local_files_only=True)

    dictionaries: dict[str, dict[str, str]] = {}
    for language, target_code in LANGUAGE_CODES.items():
        translated = translate_batch(
            unique_texts,
            tokenizer,
            model,
            target_code,
            language,
        )
        dictionaries[language] = dict(zip(unique_texts, translated, strict=True))

    if repair_rows:
        for row, product in zip(normalized_rows, catalog["products"], strict=True):
            if row["row"] not in repair_rows:
                continue
            product_id = product["id"]
            current["ru"]["productsData"][product_id]["specs"] = {
                f"detail{index + 1:02}": value
                for index, value in enumerate(row["specs"])
            }
            current["ru"]["productsData"][product_id]["features"] = row["features"]
            for language in ("en", "uz", "de"):
                current[language]["productsData"][product_id]["specs"] = {
                    f"detail{index + 1:02}": dictionaries[language][value]
                    for index, value in enumerate(row["specs"])
                }
                current[language]["productsData"][product_id]["features"] = [
                    dictionaries[language][value] for value in row["features"]
                ]

        clean_existing_output(source_rows, catalog, current)
        OUTPUT_PATH.write_text(
            json.dumps(current, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"Repaired rows {sorted(repair_rows)} in {OUTPUT_PATH}", flush=True)
        return

    output = {
        language: {
            "categories": current[language]["categories"],
            "productsData": {},
        }
        for language in ("en", "ru", "uz", "de")
    }

    for row, product in zip(normalized_rows, catalog["products"], strict=True):
        product_id = product["id"]
        for language in ("en", "ru", "uz", "de"):
            translate = (
                (lambda value: value)
                if language == "ru"
                else (lambda value, lang=language: dictionaries[lang][value])
            )
            name = translate(row["name"])
            description, full_description = build_descriptions(name, language)
            output[language]["productsData"][product_id] = {
                "name": name,
                "description": description,
                "fullDescription": full_description,
                "specs": {
                    f"detail{index + 1:02}": translate(value)
                    for index, value in enumerate(row["specs"])
                },
                "features": [translate(value) for value in row["features"]],
            }

    clean_existing_output(source_rows, catalog, output)
    OUTPUT_PATH.write_text(
        json.dumps(output, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {OUTPUT_PATH}", flush=True)


if __name__ == "__main__":
    os.environ.setdefault("HF_HUB_OFFLINE", "1")
    main()
