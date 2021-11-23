from brownie import accounts, config, BullDogeSale
from scripts.helpful_scripts import get_account


def main():
    account = get_account()
    BullDogeSale.deploy({"from": account})