import { getBackend } from "../api/api";
import {
  calculatePercentage,
  formatMoney,
  formatPercent,
  getMonth,
} from "../Services/functions";

//read backend
const { investments, reports } = getBackend();

function Investment({ children: investment }) {
  const { description, id } = investment;
  const filteredReports = reports
    .filter((report) => {
      return report.investmentId === id;
    })
    .sort((a, b) => {
      return a.month - b.month;
    });

  const firstValue = filteredReports[0].value;
  const lastValue = filteredReports[filteredReports.length - 1].value;
  const totalValue = lastValue - firstValue;
  const totalPercent = calculatePercentage(lastValue, firstValue);

  return (
    <ul className="border n-4 p-4">
      <li>
        <div className="mt-2 mb-4">
          <h2 className="text-center">
            <strong>{description}</strong>
          </h2>
          <h3 className="text-center">
            Total Investment: {formatMoney(totalValue)} (
            {formatPercent(totalPercent)})
          </h3>
        </div>

        <ul>
          {filteredReports.map((report, index) => {
            const { id, year, month, value } = report;

            const percent =
              index === 0 ? 0 : value / filteredReports[index - 1].value - 1;

            const colorClassName =
              index === 0
                ? "font-semibold"
                : percent > 0
                ? "text-green-500 font-semibold"
                : "text-red-500 font-semibold";

            return (
              <li
                key={id}
                className="flex flex-row justify-between items-center space-x-2"
              >
                <span className="font-mono">
                  {getMonth(month)}/{year}
                </span>
                <span className={`flex-1 ${colorClassName}`}>
                  {formatMoney(value)}
                </span>
                <span className={colorClassName}>{formatPercent(percent)}</span>
              </li>
            );
          })}
        </ul>
      </li>
    </ul>
  );
}

//its not possible to render an object
export function Investments() {
  investments.sort((a, b) => {
    return a.description.localeCompare(b.description);
  });

  return (
    <div>
      <ul className="p-4">
        {investments.map((investment) => {
          return (
            <li key={investment.id}>
              <Investment>{investment}</Investment>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
