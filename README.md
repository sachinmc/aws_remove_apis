Run this script if you want to get rid of all your API gateways on your AWS dashboard. I shall make some additions in the near future to keep specific gateways and delete the rest.

The gateways are removed at 60 sec (+2) intervals as per AWS delete rate limit.

Clone the repo and run `node remove_apis`
