/* add code below this */

const companies = JSON.parse(content);

class CompanyCard {
    constructor(companyData) {
        this.symbol = companyData.symbol;
        this.name = companyData.companyName;
        this.day50 = companyData.stats.day50MovingAvg;
        this.day200 = companyData.stats.day200MovingAvg;
        this.revenue = companyData.stats.operatingRevenue - companyData.stats.costOfRevenue;
        this.marketCap50 = companyData.stats.sharesOutstanding * companyData.stats.day50MovingAvg;
        this.marketCap200 = companyData.stats.sharesOutstanding * companyData.stats.day200MovingAvg
        this.equity = companyData.stats.totalAssets - companyData.stats.totalLiabilities;
        this.tags = companyData.tags;
    }

    currency = num => new Intl.NumberFormat(`en-US`, {
        style: `currency`,
        currency: `USD`
    }).format(num);

    billions = num => new Intl.NumberFormat(`en-US`, {
        style: `currency`,
        notation: `compact`,
        currency: `USD`
    }).format(num);

    outputTags = () => {
        for (const tag of this.tags) {
            document.write(`<small>` + tag + `</small>`);
        }
    }

    outputCard = () => {
        document.write(`<article class="card">`);
        document.write(`<h2>` + this.symbol + ` - ` + this.name + `.</h2>`);
        document.write(`<div>`);
        document.write(`<p>Share Price (50day avg): <span>`+ this.currency(this.day50) + `</span><p>`);
        document.write(`<p>Share Price (200day avg): <span>`+ this.currency(this.day200) + `</span><p>`);
        document.write(`<p>Market Cap (50day avg): <span>`+ this.billions(this.marketCap50) + `</span><p>`);
        document.write(`<p>Market Cap (200day avg): <span>`+ this.billions(this.marketCap200) + `</span><p>`);
        document.write(`<p>Net Revenue: <span>`+ this.billions(this.revenue) + `</span><p>`);
        document.write(`<p>Shareholder Equity: <span>`+ this.billions(this.equity) + `</span><p>`);
        document.write(`</div>`);
        document.write(`<footer>`);
        this.outputTags();
        document.write(`</footer>`);
        document.write(`</article>`);
    }
}

const outputCompanyCards = () => {
    for (const companyData of companies) {
        const companyCard = new CompanyCard(companyData);
        companyCard.outputCard();
    }
}

outputCompanyCards();
