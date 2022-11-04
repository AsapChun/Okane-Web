import { Transaction, } from "plaid"
import { Card , Spinner, Table, Row} from "react-bootstrap"
import { displayTransactions } from "./demoModels"

interface TransactionData {
  category: string;
  transactionData: Transaction;
}

interface PropsInterface {
  displayTransactions: TransactionData[],
  plaidLinked: string,
  transactionsDataLoaded: boolean,
}

const RecentTransactions: React.FC<PropsInterface> = (
  props: PropsInterface
) => {
  function category_image(category_input: string, stringOutputLength: number){
    let switchOutput = ""
    switch(category_input) {
        case "BANK_FEES_ATM_FEES":
          switchOutput = "Fees_incurred_for_out-of-network_ATMs.png"
          break;
        case "BANK_FEES_FOREIGN_TRANSACTION_FEES":
          switchOutput = "Fees_incurred_on_non-domestic_transactions.png.png"
          break;
        case "BANK_FEES_INSUFFICIENT_FUNDS":
          switchOutput = "Fees_relating_to_insufficient_funds.png"
          break;
        case "BANK_FEES_INTEREST_CHARGE":
          switchOutput = "Fees_incurred_for_interest_on_purchases,_including_not-paid-in-full_or_interest_on_cash_advances.png"
          break;
        case "BANK_FEES_OVERDRAFT_FEES":
          switchOutput = "Fees_incurred_when_an_account_is_in_overdraft.png"
          break;
        case "BANK_FEES_OTHER_BANK_FEES":
          switchOutput = "Other_miscellaneous_bank_fees.png"
          break;
        case "ENTERTAINMENT_CASINOS_AND_GAMBLING":
          switchOutput = "Gambling,_casinos,_and_sports_betting.png"
          break;
        case "ENTERTAINMENT_MUSIC_AND_AUDIO":
          switchOutput = "Digital_and_in-person_music_purchases,_including_music_streaming_services.png"
          break;
        case "ENTERTAINMENT_SPORTING_EVENTS_AMUSEMENT_PARKS_AND_MUSEUMS":
          switchOutput = "Purchases_made_at_sporting_events,_music_venues,_concerts,_museums,_and_amusement_parks.png"
          break;
        case "ENTERTAINMENT_TV_AND_MOVIES":
          switchOutput = "In_home_movie_streaming_services_and_movie_theaters.png"
          break;
        case "ENTERTAINMENT_VIDEO_GAMES":
          switchOutput = "Digital_and_in-person_video_game_purchases.png"
          break;
        case "ENTERTAINMENT_OTHER_ENTERTAINMENT":
          switchOutput = "Other_miscellaneous_entertainment_purchases,_including_night_life_and_adult_entertainment.png"
          break;
        case "FOOD_AND_DRINK_BEER_WINE_AND_LIQUOR":
          switchOutput = "Beer,_Wine_&_Liquor_Stores.png"
          break;
        case "FOOD_AND_DRINK_COFFEE":
          switchOutput = "Purchases_at_coffee_shops_or_cafes.png"
          break;
        case "FOOD_AND_DRINK_FAST_FOOD":
          switchOutput = "Dining_expenses_for_fast_food_chains.png"
          break;
        case "FOOD_AND_DRINK_RESTAURANT":
          switchOutput = "Dining_expenses_for_restaurants,_bars,_gastropubs,_and_diners.png"
          break;
        case "FOOD_AND_DRINK_VENDING_MACHINES":
          switchOutput = "Purchases_made_at_vending_machine_operators.png"
          break;
        case "FOOD_AND_DRINK_OTHER_FOOD_AND_DRINK":
          switchOutput = "Other_miscellaneous_food_and_drink,_including_desserts,_juice_bars,_and_delis.png"
          break;
        case "GENERAL_MERCHANDISE_BOOKSTORES_AND_NEWSSTANDS":
          switchOutput = "Books,_magazines,_and_news_.png"
          break;
        case "GENERAL_MERCHANDISE_CLOTHING_AND_ACCESSORIES":
          switchOutput = "Apparel,_shoes,_and_jewelry.png"
          break;
        case "GENERAL_MERCHANDISE_CONVENIENCE_STORES":
          switchOutput = "Purchases_at_convenience_stores.png"
          break;
        case "GENERAL_MERCHANDISE_DEPARTMENT_STORES":
          switchOutput = "Retail_stores_with_wide_ranges_of_consumer_goods,_typically_specializing_in_clothing_and_home_goods.png"
          break;
        case "GENERAL_MERCHANDISE_DISCOUNT_STORES":
          switchOutput = "Stores_selling_goods_at_a_discounted_price.png"
          break;
        case "GENERAL_MERCHANDISE_ELECTRONICS":
          switchOutput = "Electronics_stores_and_websites.png"
          break;
        case "GENERAL_MERCHANDISE_GIFTS_AND_NOVELTIES":
          switchOutput = "Photo,_gifts,_cards,_and_floral_stores.png"
          break;
        case "GENERAL_MERCHANDISE_OFFICE_SUPPLIES":
          switchOutput = "Stores_that_specialize_in_office_goods.png"
          break;
        case "GENERAL_MERCHANDISE_ONLINE_MARKETPLACES":
          switchOutput = "Multi-purpose_e-commerce_platforms_such_as_Etsy,_Ebay_and_Amazon.png.png"
          break;
        case "GENERAL_MERCHANDISE_PET_SUPPLIES":
          switchOutput = "Pet_supplies_and_pet_food.png"
          break;
        case "GENERAL_MERCHANDISE_SPORTING_GOODS":
          switchOutput = "Sporting_goods,_camping_gear,_and_outdoor_equipment.png"
          break;
        case "GENERAL_MERCHANDISE_SUPERSTORES":
          switchOutput = "Superstores_such_as_Target_and_Walmart,_selling_both_groceries_and_general_merchandise.png"
          break;
        case "GENERAL_MERCHANDISE_TOBACCO_AND_VAPE":
          switchOutput = "Purchases_for_tobacco_and_vaping_products.png"
          break;
        case "GENERAL_MERCHANDISE_OTHER_GENERAL_MERCHANDISE":
          switchOutput = "Other_miscellaneous_merchandise,_including_toys,_hobbies,_and_arts_and_crafts.png"
          break;
        case "HOME_IMPROVEMENT_FURNITURE":
          switchOutput = "Furniture,_bedding,_and_home_accessories.png"
          break;
        case "PERSONAL_CARE_GYMS_AND_FITNESS_CENTERS":
          switchOutput = "Gyms,_fitness_centers,_and_workout_classes.png"
          break;
        case "PERSONAL_CARE_HAIR_AND_BEAUTY":
          switchOutput = "Manicures,_haircuts,_waxing,_spa,_massages,_and_bath_and_beauty_products.png"
          break;
        case "PERSONAL_CARE_LAUNDRY_AND_DRY_CLEANING":
          switchOutput = "Wash_and_fold,_and_dry_cleaning_expenses.png"
          break;
        case "PERSONAL_CARE_OTHER_PERSONAL_CARE":
          switchOutput = "Other_miscellaneous_personal_care,_including_mental_health_apps_and_services.png"
          break;
        case "GENERAL_SERVICES_ACCOUNTING_AND_FINANCIAL_PLANNING":
          switchOutput = "Financial_planning,_and_tax_and_accounting_services.png"
          break;
        case "GENERAL_SERVICES_POSTAGE_AND_SHIPPING":
          switchOutput = "Mail,_packaging,_and_shipping_services.png"
          break;
        case "GENERAL_SERVICES_STORAGE":
          switchOutput = "Storage_services_and_facilities.png"
          break;
        case "GOVERNMENT_AND_NON_PROFIT_DONATIONS":
          switchOutput = "Charitable,_political,_and_religious_donations.png"
          break;
        case "TRANSPORTATION_BIKES_AND_SCOOTERS":
          switchOutput = "Bike_and_scooter_rentals.png"
          break;
        case "TRANSPORTATION_GAS":
          switchOutput = "Purchases_at_a_gas_station.png"
          break;
        case "TRANSPORTATION_PARKING":
          switchOutput = "Parking_fees_and_expenses.png"
          break;
        case "TRANSPORTATION_PUBLIC_TRANSIT":
          switchOutput = "Public_transportation,_including_rail_and_train,_buses,_and_metro.png"
          break;
        case "TRANSPORTATION_TAXIS_AND_RIDE_SHARES":
          switchOutput = "Taxi_and_ride_share_services.png"
          break;
        case "TRANSPORTATION_TOLLS":
          switchOutput = "Toll_expenses.png"
          break;
        case "TRANSPORTATION_OTHER_TRANSPORTATION":
          switchOutput = "Other_miscellaneous_transportation_expenses.png"
          break;
        case "TRAVEL_FLIGHTS":
          switchOutput = "Airline_expenses.png"
          break;
        case "TRAVEL_LODGING":
          switchOutput = "Hotels,_motels,_and_hosted_accommodation_such_as_Airbnb.png"
          break;
        case "TRAVEL_RENTAL_CARS":
          switchOutput = "Rental_cars,_charter_buses,_and_trucks.png"
          break;
        case "TRAVEL_OTHER_TRAVEL":
          switchOutput = "Other_miscellaneous_travel_expenses.png"
          break;
        default:
        return "Essential spending"
    }
   let switchOutputCutoff = switchOutput.substring(stringOutputLength, switchOutput.length).indexOf(",") + stringOutputLength
   let firstSpaceAfter = switchOutput.substring(stringOutputLength, switchOutput.length).indexOf("_") + stringOutputLength
   if(switchOutput.length <= stringOutputLength){
    switchOutput = switchOutput.replace(/_/g, " ").substring(0, switchOutput.length - 4)
   } else if (switchOutputCutoff >= stringOutputLength && (switchOutputCutoff - firstSpaceAfter) <= 5) {
      switchOutput = switchOutput.replace(/_/g, " ").substring(0, switchOutputCutoff) + "..."
   }
   else if (firstSpaceAfter >= stringOutputLength){
    switchOutput = switchOutput.substring(0, firstSpaceAfter).replace(/_/g, " ") + "..."
   } else {
    switchOutput = switchOutput.replace(/_/g, " ").substring(0, switchOutput.length - 4)
   }
   return switchOutput
  }

  let transactionList = props.displayTransactions;
  let plaidLinked = props.plaidLinked;
  if(plaidLinked === "false" && !props.transactionsDataLoaded){
    transactionList = displayTransactions
  }
  let id = 0;
  return(
    <div>
      <Card className="border-0" style={{
      }}>
        <Card.Header style={{
          paddingLeft: "0px"
        }}>
          <Card.Title style={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "25px",
          }}>{plaidLinked === "false" ?  "Recent Transactions" : "Recent Transactions"}</Card.Title>
        </Card.Header>
        {transactionList.length === 0 ? 
          <Row style={{
            paddingLeft: "20px"
          }}>
            <Spinner animation="grow" size="sm"/>
            <Spinner animation="grow" size="sm"/> 
            <Spinner animation="grow" size="sm"/> 
            Loading 
          </Row>
          : 
          <></>
        }
        <Card.Body className="table-full-width table-responsive px-0 ">
          <Table className="table-hover" style={{width: "100%"}}>
            <tbody>
                {transactionList.map((data) => 
                  <tr key={id+=1} style ={{
                    fontFamily: 'Poppins',
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "15px",
                  }}>
                    <td style ={{
                    }}>
                      <div style = {{
                        color: "#0D268A",
                        fontSize: "10px",
                      }}>{category_image(data.transactionData.personal_finance_category.detailed, 20)}</div>
                      <div>{data.transactionData.date}</div>
                      </td>
                    <td>
                      <div>{data.transactionData.name}</div>
                      </td>
                    <td className="text-nowrap" >${Math.round((data.transactionData.amount))}</td>
                  </tr>
                )}
            </tbody>
          </Table>
          {/* <a style = {{
            textDecoration: "underline",
            fontSize: "15px"
          }} href = "#transactions">
            View more
          </a> */}
        </Card.Body>
      </Card>
    </div>  
  )

}

export default RecentTransactions