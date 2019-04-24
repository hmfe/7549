/**
 * Create ResultBox.
 * @author andre@orefjard.com (André Orefjärd)
 */

const ResultBox = (props) => `
        <div class="result-box">
            <div class="result-box-item">
                <p>Stock Ticker: ${props.symbol} Name: ${props.name}</p>
                <p>Market Open: ${props.marketOpen} Market Close: ${props.marketClose}</p>
            </div>
        </div>
     `;

export default ResultBox;
