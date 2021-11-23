from brownie import accounts, config, BullDoge
from scripts.helpful_scripts import get_account


def main():
    account = get_account()
    BullDoge.deploy({"from": account})