import { Builder, By, Capabilities, until, WebDriver, WebElement} from "selenium-webdriver"
const chromedriver = require("chromedriver")
const driver: WebDriver = new Builder().withCapabilities(Capabilities.chrome()).build()
import {emManager} from './employeeManagerPageObject'
const employeePage = new emManager(driver)

class Technicians {
    name: string;
    phone: number;
    title: string;

    constructor(name:string, phone:number, title:string) {
        this.name = name
        this.phone = phone
        this.title = title
    }
}

let newTechnicians: Array<Technicians> = [
    new Technicians("Cayde", 8008735562, "Radiology"),
    new Technicians("Pickles", 4561237898, "Urinology"),
    new Technicians("Jack Frost", 7894561232, "Frozenology")
]

let addEmp = async (newTechnicians) => {
    await employeePage.click(employeePage.addEmployee)
    await employeePage.click(employeePage.newEmployee)
    await employeePage.click(employeePage.nameField)
    await employeePage.setInput(employeePage.nameField, newTechnicians.name)
    await employeePage.click(employeePage.phoneField)
    await employeePage.setInput(employeePage.phoneField, newTechnicians.phone)
    await employeePage.click(employeePage.titleField)
    await employeePage.setInput(employeePage.titleField, newTechnicians.title)
    await employeePage.click(employeePage.saveBtn)
}

describe("should add employees to employee manager", () => {
    test("can add employees using array", async () =>{
        await employeePage.navigate()
        for(let i = 0; i < newTechnicians.length; i++){
            await addEmp(newTechnicians[i])
        }
        await employeePage.driver.quit()
    })
})