var transactions = [
    { source: 'A', name: 'grocery shopping sains', amount: 10, class: 'GROCERIES', example: true},
    { source: 'A', name: 'grocery sains lunch', amount: 3},
    { source: 'B', name: 'sky television', amount: 30, class: 'BILLS', example: true},
    { source: 'C', name: 'something else', amount: 30},
    { source: 'C', name: 'television licence', amount: 30}
];

var examples = transactions.filter(t => t.example);

module.exports = {
    transactions, 
    examples,
    classifications: new Set(examples.map(t => t.class))
};
