import { isTaggedTemplateExpression } from "typescript";

export function reducer(arr) {
    
  let newArr = [];

  arr.forEach((item, i) => {
    newArr.push({
      state: item.state,
      state_slug: item.state_slug,
      cities: [],
    });
  });
  newArr = newArr.filter(
    (v, i, a) => a.findIndex((t) => t.state === v.state) === i
  );

  arr.forEach((item) => {
    newArr.forEach((inneritem) => {
      inneritem.state == item.state &&
        inneritem.cities.push({ 
            city: item.city, 
            city_slug: item.city_slug,
            neighbourhoods: [] 
        });
    });
  });

  newArr.forEach((item) => {
    item.cities = item.cities.filter(
      (v, i, a) => a.findIndex((t) => t.city === v.city) === i
    );
  });

  arr.forEach((item) => {
    newArr.forEach((inneritem) => {
      inneritem.cities.forEach((city, i) => {
        item.city == inneritem.cities[i].city &&
          city.neighbourhoods.push(`${item.neighbourhood},${item.neighbourhood_slug}`);
      });
    });
  });

  newArr.forEach((item) => {
    item.cities.forEach((city) => {
      city.neighbourhoods = city.neighbourhoods.filter(
        (v, i, a) => a.findIndex((t) => t === v) === i
      );
    });
  });

  return newArr;
}
