using { bupa as my } from '../db/data-model';

@impl:'dist/business-partner/business-partner-service-handler'
service BupaService  {
  entity CapBusinessPartner @readonly as projection on my.CapBusinessPartner;

  function getByKey(param : String) returns CapBusinessPartner;
  function getAll() returns array of CapBusinessPartner;
}