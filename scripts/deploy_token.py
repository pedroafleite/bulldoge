from brownie import accounts, config, BullDoge
from scripts.helpful_scripts import get_account


def main():
    account = get_account()
    erc20 = BullDoge.deploy({"from": account})