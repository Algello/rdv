class Article {
    constructor(article) {
        this.rawArticle = article.trim();
        this.name = '';
        this.number = '';
        this.unique = '';
        this.keys = [];
        this.articleNumberAndName();
        this.articleKeys(this.rawArticle);
        console.log(this);
    }
    articleNumberAndName() {
        let Quotes = /"(.*?)"/i; // Ищет любые символы между двух двойных кавычек
        let Number = /\d+/i; // Находит все числа в заданной строке
        let articleName = this.rawArticle.match(Quotes)[1].trim();
        let articleNumber = this.rawArticle.match(Number)[0];

        this.name = articleName; // Получившиеся значения мы добавляем в изначальный объект
        this.number = articleNumber;
        this.unique = articleName;
    }
    articleKeys(articlesTrimmed) {
        let withoutHead = function () { // Убираем заголовок и номер стать, оставляем толко ключи
            return articlesTrimmed.split('"').pop();
        };
        let extractAllKeys = function () { // Извлекаем все ключи в каждой статье, предварительно разделенные ','
            let rawString = withoutHead();
            return rawString.split(",");
        };
        this.keys = extractAllKeys();
    }
}

export {Article}