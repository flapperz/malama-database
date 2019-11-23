# SQL 
## Store procedures and functions
### Procedures
### Functions
    How to call function `SELECT usf_deposit_dog(dog_id, box_id)` 
1. `usf_deposit_dog(dog_id, box_id)`
    - deposit dog : create product -> change box status -> create deposition)
    - CRASH when pass invalid dog_id box_id
    - RETURN 0 (success), 1 (fail - deposit in box which not available)