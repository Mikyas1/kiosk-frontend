const packages = [
    {price: "Free", tokens: 20, color: "c_white_gold"},
    // {price: 5, tokens: 20, color: "c_white_gold"},
    // {price: 10, tokens: 50, color: "c_silver"},
    // {price: 15, tokens: 75, color: "c_old_gold"},
    // {price: 25, tokens: 100, color: "c_bronze"},
    // {price: 50, tokens: 250, color: "c_gold"},
    // {price: 100, tokens: 500, color: "c_yellow"},
];

//   const getUserById = (uuid) => {
//     return (uuid === undefined) ? Items[0] : Items.find(x => x.uuid === uuid);
//   };
  
//   const getUser = (limit) => {
//     return (limit) ? Items.slice(0, limit) : Items;
//   };

const location = {
    countries: ["Ethiopia"],
    regions: ["Oromia", "Amhara", "Tigray", "Addis Ababa"]
}

export {
    packages,
    location,
    // getUser,
    // getUserById
};