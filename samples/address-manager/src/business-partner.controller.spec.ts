import { Test, TestingModule } from "@nestjs/testing";
import { BusinessPartnerController } from "./business-partner.controller";
import { BusinessPartnerService } from "./business-partner.service";

/**
 * You need to start the local S/4 Mock server https://sap.github.io/cloud-s4-sdk-book/pages/mock-odata.html and run it on port 3000 for these tests to work.
 */
describe("AppController", () => {
  let controller: BusinessPartnerController;
  const bpId = "1003764";

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BusinessPartnerController],
      providers: [BusinessPartnerService],
    }).compile();

    controller = app.get<BusinessPartnerController>(BusinessPartnerController);
  });

  it("should return business partners", async () => {
    const bps = await controller.getAllBusinessPartners();
    expect(bps.length).toBeGreaterThan(0);
  }, 1000000);

  it("should return business partners by id", async () => {
    const bps = await controller.getBusinessPartnerById(bpId);
    expect(bps).toBeDefined();
    expect(bps.toBusinessPartnerAddress).toBeDefined();
  });

  it("create address", async () => {
    const numberBefore = (await controller.getBusinessPartnerById(bpId))
      .toBusinessPartnerAddress.length;
    await controller.createAddress(
      {
        postalCode: "14469",
        cityName: "Potsdam",
        streetName: "Konrad-Zuse-Ring",
        houseNumber: "10",
      },
      bpId
    );

    const bps = await controller.getBusinessPartnerById(bpId);
    expect(numberBefore).toBe(bps.toBusinessPartnerAddress.length - 1);
  });

  it("update address", async () => {
    const addressOld = (await controller.getBusinessPartnerById(bpId))
      .toBusinessPartnerAddress[0];
    const randomValue = Math.floor(Math.random() * 100).toString(10);

    await controller.updateBusinessPartnerAddress(
      {
        ...addressOld,
        houseNumber: randomValue,
      },
      bpId,
      addressOld.addressId
    );

    const bpsUpdate = await controller.getBusinessPartnerById(bpId);
    expect(bpsUpdate.toBusinessPartnerAddress[0].houseNumber).toBe(randomValue);
  });

  it("deletes address", async () => {
    await controller.createAddress(
      {
        postalCode: "14469",
        cityName: "Potsdam",
        streetName: "Konrad-Zuse-Ring",
        houseNumber: "10",
      },
      bpId
    );
    const addresses = (await controller.getBusinessPartnerById(bpId))
      .toBusinessPartnerAddress;
    await Promise.all(
      addresses.map((a) =>
        controller.deleteBusinessPartnerAddress(bpId, a.addressId)
      )
    );
    const addressesAfterDelete = (await controller.getBusinessPartnerById(bpId))
      .toBusinessPartnerAddress;
    expect(addressesAfterDelete.length).toBe(0);
  });
});
