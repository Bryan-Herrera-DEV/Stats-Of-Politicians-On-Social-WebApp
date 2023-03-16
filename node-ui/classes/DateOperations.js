class DateOperations {
    static #dateToString(date) {
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        return `${year}-${month}-${day}`;
    }

    static getYesterday() {
        return DateOperations.goDaysBackFromNow(1);
    }

    static goDaysBackFromNow(n) {
        const d = new Date();
        d.setDate(d.getUTCDate() - n);
        return DateOperations.#dateToString(d);
    }
    
    static goMonthsBackFromNow(n) {
        const d = new Date();
        d.setMonth(d.getUTCMonth() - n);
        return DateOperations.#dateToString(d);
    }

    static goYearsBackFromNow(n) {
        const d = new Date();
        d.setFullYear(d.getUTCFullYear() - n);
        return DateOperations.#dateToString(d);
    }
}

module.exports = DateOperations