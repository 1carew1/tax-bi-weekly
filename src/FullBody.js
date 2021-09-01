import React, {Component} from 'react';

class FullBody extends Component {

    constructor(props) {
        super(props)
        this.state = {
            WeeklyTC: 64.82,
            WeeklyCutOff: 685.63,
            BiWeeklyIncome: 1730.82
        }
    }

    setTaxPayableToDate(janNetEvent) {
        console.log(janNetEvent.target.value);
        this.setState({
            payable: Number(janNetEvent.target.value)
        });
    }

    setTaxPaidToDate(febNetEvent) {
        console.log(febNetEvent.target.value);
        this.setState({
            tax: Number(febNetEvent.target.value)
        });
    }

    setWeek(event) {
        console.log(event.target.value);
        this.setState({
            week: Number(event.target.value)
        });
    }


    round(num) {
        return Math.round(Number(num) * 100) / 100
    }

    govCalc() {
        let week = this.state.week;
        let payable = this.state.payable;
        let tax = this.state.tax;

        if (!week || !payable || !tax) {
            return <p>Please Enter Above values</p>;
        }

        week += 2;

        let lastTax = tax;
        let rows = [];
        while (week < 53) {
            console.log("Iterating Through " + week);
            payable = this.round(payable + this.state.BiWeeklyIncome);
            const standardCutOffTilNow = this.round(week * this.state.WeeklyCutOff);
            const higherTaxPayable = this.round(payable - standardCutOffTilNow);
            const lowerTax = this.round(standardCutOffTilNow * .2);
            const higherTax = this.round(higherTaxPayable * .4);
            const taxCredits = this.round(this.state.WeeklyTC * week);
            const totalTax = this.round(lowerTax + higherTax - taxCredits);
            const taxDifference = this.round(totalTax - lastTax);
            lastTax = totalTax;

            rows.push(<tr key={week}>
                <td>{week}</td>
                <td>{payable}</td>
                <td>{standardCutOffTilNow}</td>
                <td>{higherTaxPayable}</td>
                <td>{lowerTax}</td>
                <td>{higherTax}</td>
                <td>{taxCredits}</td>
                <td>{totalTax}</td>
                <td>{taxDifference}</td>
            </tr>);

            week += 2;
        }

        return <table className="table">
            <thead>
            <tr>
                <th>Week</th>
                <th>Tax Payable</th>
                <th>Standard Cut Off</th>
                <th>Higher Band</th>
                <th>20% On Standard</th>
                <th>40% on Higher</th>
                <th>Tax Credits</th>
                <th>Total Tax</th>
                <th>Tax Difference</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>;
    }

    render() {
        const calculation = this.govCalc();

        return (
            <div className="container-fluid">
                <div className="col-md-12">
                    <h2>DISCLAIMER</h2>
                    <p>None of the data entered is stored and no external calls are made by this application</p>
                    <h2>Calculator</h2>
                    <p>Tax Credits Per Week : €{this.state.WeeklyTC}</p>
                    <p>Weekly Cut Off : €{this.state.WeeklyCutOff} - should be €678.85</p>
                    <p>Bi-Weekly Income : €{this.state.BiWeeklyIncome}</p>
                    <p>Week : <input type="number"
                                     onChange={this.setWeek.bind(this)}/></p>
                    <p>Tax Payable to this week : <input type="number"
                                                         onChange={this.setTaxPayableToDate.bind(this)}/></p>
                    <p>Tax to this week : <input type="number"
                                                 onChange={this.setTaxPaidToDate.bind(this)}/></p>
                    <br/>
                    {calculation}
                </div>
            </div>
        );
    }
}

export default FullBody;
