package models

// SeedScholarships contains the initial scholarship data.
// Use this to populate the scholarships table on first run
// (e.g. via a /admin/seed endpoint or a CLI migration command).
// In production, deadline_at should be set to real fixed dates, not relative offsets.
var SeedScholarships = []Scholarship{
	{
		ID:          1,
		Type:        "Стипендия",
		Title:       "Полная стипендия Оксфордского университета",
		Description: "Подайте заявку на полную стипендию Оксфордского университета. Покрывает обучение, проживание и расходы на жизнь.",
		Institution: "Оксфордский университет",
		Documents:   []string{"Личное эссе", "Рекомендательное письмо", "Академическая выписка", "Резюме"},
		RequiredFiles: []RequiredFile{
			{Icon: "📄", Name: "kopiya_pasporta.pdf"},
			{Icon: "💰", Name: "finansovaya_spravka.pdf"},
			{Icon: "🌐", Name: "yazykovoy_sertifikat.pdf"},
		},
	},
	{
		ID:          2,
		Type:        "Дедлайн",
		Title:       "Заявки на исследовательскую программу MIT",
		Description: "Подайте заявку на летнюю исследовательскую программу MIT до истечения срока.",
		Institution: "MIT",
		Documents:   []string{"Исследовательское предложение", "Академическая выписка", "Рекомендательное письмо"},
		RequiredFiles: []RequiredFile{
			{Icon: "📄", Name: "kopiya_pasporta.pdf"},
			{Icon: "📝", Name: "issledovatelskoe_predlozhenie.pdf"},
			{Icon: "🎓", Name: "akademicheskaya_vypiska.pdf"},
		},
	},
	{
		ID:          3,
		Type:        "Стипендия",
		Title:       "Программа Erasmus+",
		Description: "Учёба в Европе с полным финансированием. Открыто для всех специальностей из университетов Центральной Азии.",
		Institution: "Erasmus+",
		Documents:   []string{"Мотивационное письмо", "Академическая выписка", "Языковой сертификат", "Резюме"},
		RequiredFiles: []RequiredFile{
			{Icon: "📄", Name: "kopiya_pasporta.pdf"},
			{Icon: "✉️", Name: "motivatsionnoe_pismo.pdf"},
			{Icon: "🌐", Name: "yazykovoy_sertifikat.pdf"},
		},
	},
	{
		ID:          4,
		Type:        "Дедлайн",
		Title:       "Подача документов в МГУ",
		Description: "Последний день для отправки всех необходимых документов в Московский государственный университет.",
		Institution: "МГУ",
		Documents:   []string{"Аттестат / Диплом", "Фотографии 3×4", "Медицинская справка"},
		RequiredFiles: []RequiredFile{
			{Icon: "📄", Name: "kopiya_pasporta.pdf"},
			{Icon: "🎓", Name: "attestat.pdf"},
			{Icon: "🏥", Name: "meditsinskaya_spravka.pdf"},
		},
	},
	{
		ID:          5,
		Type:        "Стипендия",
		Title:       "Грант Правительства Китая",
		Description: "Полное покрытие обучения в ведущих университетах Китая. Открыто для всех специальностей.",
		Institution: "Правительство Китая",
		Documents:   []string{"Личное эссе", "Академическая выписка", "Медицинская форма", "Языковой сертификат"},
		RequiredFiles: []RequiredFile{
			{Icon: "📄", Name: "kopiya_pasporta.pdf"},
			{Icon: "🎓", Name: "akademicheskaya_vypiska.pdf"},
			{Icon: "🏥", Name: "meditsinskaya_forma.pdf"},
			{Icon: "🌐", Name: "yazykovoy_sertifikat.pdf"},
		},
	},
}
