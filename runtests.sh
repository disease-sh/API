npm run test-single $(cat test_to_run.txt | while read line; do echo $line; done)
