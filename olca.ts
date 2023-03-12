/* olca Prgraminng Car Ver0.1 2023/1/1 NaRiKa */
let wait = 0;
let Tugi_R = 0;
let Tugi_L = 0;
let T1 = 0;
let PremotionR = 0;
let PremotionL = 0;
let con_kaiten = 1.61;
let cond_Distance = 1;
let cond_degree = 1;
let microbit_wait = 750;
let Stepping_non = 0
let SteppingF_0 = 207854691 /* 0b1100011000111001110001100011 */
let SteppingB_0 = 154585398  /*0b1001001101101100100100110110 */
let Stepping_R = 0
let Stepping_L = 0
let original_bit = 8     /* 1000 */
let outputsR = [DigitalPin.P3, DigitalPin.P4, DigitalPin.P6, DigitalPin.P7]
let outputsL = [DigitalPin.P13, DigitalPin.P14, DigitalPin.P15, DigitalPin.P16];


//LED不使用
led.enable(false)

basic.pause(300);
pins.servoWritePin(AnalogPin.P8, 70);
basic.pause(300);
pins.digitalWritePin(DigitalPin.P8, 0);

for (let n = 0; n < 4; n++) {
    (outputsR[n], 0)
    pins.digitalWritePin(outputsL[n], 0)
}

let moter_number = 0;
let io_neo = neopixel.create(DigitalPin.P9, 25, NeoPixelMode.RGB);
io_neo.setBrightness(15)
for (let n = 0; n < 25; n++) {
    io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Black))
}
io_neo.show()





//バージョンの判定
let first = input.runningTimeMicros()
let sum = 0
for (let index = 0; index < 1000; index++) {
    sum += 1
}
//basic.showNumber(input.runningTimeMicros() - first);
if ((input.runningTimeMicros() - first) < 2000) {
    microbit_wait = 4500;
}
else {
    microbit_wait = 900;
}



//% color="#3943c6" block="olca Ver0.1" weight=95 icon="\uf1b9"
namespace olca {

    export enum pen_updown {
        //% block="down"
        down,
        //% block="up"
        up
    }

    export enum car_FB {
        //% block="forward"
        forward,
        //% block="backward"
        backward
    }

    export enum olca_RL {
        //% block="right"
        right,
        //% block="left"
        left
    }


    export enum microbit_LED {
        //% block="disable"
        disable,
        //% block="activate"
        activate
    }

    export enum direction {
        //% block="right_angle"
        right_angle,
        //% block="left_angle"
        left_angle,
        //% block="diagonal_right"
        diagonal_right,
        //% block="diagonal_left"
        diagonal_left
    }


    export enum kyori {
        //% block="long"
        long,
        //% block="short",
        short
    }
    export enum sence_select {
        //% block="normal30"
        normal30,
        //% block="High_sensitivity"
        High_sensitivity,
        //% block="Low_sensitivity",
        Low_sensitivity
    }


    export enum onoff {
        //% block="ON"
        ON,
        //% block="OFF"
        OFF
    }
    export enum whiteblack {
        //% block="black"
        black,
        //% block="white"
        white
    }

    function moter(kyori: number, R_zengo: number, L_zengo: number) {
        led.enable(false);
        let i = 0;
        /* 端数の計算計算  */

        let kyori_hasuu = kyori % 1;
        let kyori_seisuu = Math.floor(kyori);

        /* forward回の動作との比較と処理  */
        if (PremotionR == R_zengo) {
            Tugi_R = Tugi_R + 1;
        }
        if (PremotionR > R_zengo) {
            Tugi_R = 3 - Tugi_R + 1;
        }
        if (PremotionR < R_zengo) {
            Tugi_R = 3 - Tugi_R + 1;
        }

        if (PremotionL == L_zengo) {
            Tugi_L = Tugi_L + 1;
        }
        if (PremotionL > L_zengo) {
            Tugi_L = 3 - Tugi_L + 1;
        }
        if (PremotionL < L_zengo) {
            Tugi_L = 3 - Tugi_L + 1;
        }


        /*   次のstep*/
        Tugi_L = (Tugi_L) % 4;
        Tugi_R = (Tugi_R) % 4;

        /*右ステッピングの処理*/
        switch (R_zengo) {
            case 0:
                Stepping_R = Stepping_non;
                break;
            case 1:
                Stepping_R = SteppingB_0 << (Tugi_R * 4)
                break;
            case 2:
                Stepping_R = SteppingF_0 << (Tugi_R * 4)
                break;
        }
        Stepping_L = SteppingF_0
        /*左ステッピングの処理*/
        switch (L_zengo) {
            case 0:
                Stepping_L = Stepping_non;
                break;
            case 1:
                Stepping_L = SteppingF_0 << (Tugi_L * 4)
                break;
            case 2:
                Stepping_L = SteppingB_0 << (Tugi_L * 4)
                break;
        }

        /*  バックラッシュの処理　right_wheel*/
        if (PremotionR != R_zengo) {
            music.playTone(523, music.beat(BeatFraction.Sixteenth))
            basic.pause(300);
            for (let index = 0; index < 3; index++) {
                let n = 0;
                while (n < 4) {
                    for (let m = 0; m < 4; m++) {
                        pins.digitalWritePin(outputsR[m], (((Stepping_R >> (24 - n * 4)) & (original_bit >> m)) >> (3 - m)));
                    }
                    n = n + 1;
                    for (i = 0; i < microbit_wait; i++);
                    {
                    }
                }
            }
            basic.pause(200);
        }


        /*  バックラッシュの処理　left_wheel*/
        if (PremotionL != L_zengo) {
            music.playTone(523, music.beat(BeatFraction.Sixteenth))
            basic.pause(300);
            for (let index = 0; index < 3; index++) {
                let n = 0;
                while (n < 4) {
                    for (let m = 0; m < 4; m++) {
                        pins.digitalWritePin(outputsL[m], (((Stepping_L >> (24 - n * 4)) & (original_bit >> m)) >> (3 - m)));
                    }
                    n = n + 1;
                    for (i = 0; i < microbit_wait; i++);
                    {
                    }
                }
            }

        }


        /*  整数部の処理　 */
        for (let index = 0; index < kyori_seisuu; index++) {
            for (let n = 0; n < 4; n++) {
                for (let m = 0; m < 4; m++) {
                    pins.digitalWritePin(outputsL[m], (((Stepping_L >> (24 - n * 4)) & (original_bit >> m)) >> (3 - m)));
                    pins.digitalWritePin(outputsR[m], (((Stepping_R >> (24 - n * 4)) & (original_bit >> m)) >> (3 - m)));
                }
                for (let i = 0; i < microbit_wait; i++);
                {
                }
            }
        }


        /* 端数分の進み方と処理  */
        let Step_number = Math.floor(kyori_hasuu * 10 / 2.5);
        let n = 0;
        while (n < Step_number) {
            for (let m = 0; m < 4; m++) {
                pins.digitalWritePin(outputsL[m], (((Stepping_L >> (24 - n * 4)) & (original_bit >> m)) >> (3 - m)));
                pins.digitalWritePin(outputsR[m], (((Stepping_R >> (24 - n * 4)) & (original_bit >> m)) >> (3 - m)));
            }
            n = n + 1;
            for (i = 0; i < microbit_wait; i++);
            {
            }
        }

        Tugi_L = (Tugi_L + n - 1) % 4;
        Tugi_R = (Tugi_R + n - 1) % 4;

        PremotionR = R_zengo;
        PremotionL = L_zengo;
        for (let n = 0; n < 4; n++) {
            pins.digitalWritePin(outputsR[n], 0)
            pins.digitalWritePin(outputsL[n], 0)
        }
    }


    //% color="#ff1493" weight=96 blockId=narika_relay block="pen |%mode| " group="1 Control Pen"
    export function car_pen(mode: pen_updown) {
        if (mode == pen_updown.up) {
            pins.servoWritePin(AnalogPin.P8, 70);
            basic.pause(500);
            pins.digitalWritePin(DigitalPin.P8, 0)
        }
        if (mode == pen_updown.down) {
            pins.servoWritePin(AnalogPin.P8, 45);
            basic.pause(500);
        }

    }
    /*
        //% color="#ff1493" weight=90 blockId=narika_relay2 block="New_pen |%mode| " group="1 Control Pen"
        export function car_pen2(mode: pen_updown) {
            if (mode == pen_updown.up) {
                pins.servoWritePin(AnalogPin.P8, 80);
                basic.pause(1000);
            }
    
            if (mode == pen_updown.down) {
                pins.servoWritePin(AnalogPin.P8, 45);
                basic.pause(300);
            }
        }
    */
    //% color="#3943c6" weight=80 blockId=car_zengo
    //% block="Move |%zengo| |%F_cm| cm" group="2 Basic control"
    export function car_zengo(zengo: car_FB, F_cm: number): void {
        switch (zengo) {
            case car_FB.forward:
                moter_number = F_cm / (18.9 * cond_Distance) * 512;
                moter(moter_number, 1, 1);
                break;

            case car_FB.backward:
                moter_number = F_cm / (18.9 * cond_Distance) * 512;
                moter(moter_number, 2, 2);
                break;
        }
    }

    //% color="#3943c6" weight=76 blockId=car_RL_cycle
    //% block="Rotate |%L_degree|degrees to |%RorL|" group="2 Basic control"
    export function car_RL_cycle(RL_degree: number, RorL: olca_RL): void {
        switch (RorL) {
            case olca_RL.left:
                moter_number = RL_degree / 360 * 512 * con_kaiten * cond_degree;
                moter(moter_number, 1, 2);
                break;
            case olca_RL.right:
                moter_number = RL_degree / 360 * 512 * con_kaiten * cond_degree;
                moter(moter_number, 2, 1);
                break;
        }
    }


    //% color="#ff4940" weight=71 blockId=car_rest
    //% block="power off" group="2 Basic control"
    export function car_frest(): void {
        moter_number = 1;
        moter(moter_number, 0, 1);
    }




    //% color="#3943c6" weight=72 blockId=car_DTG
    //% block="change direction to|%muki|" group="2 Basic control"
    export function car_DTG(muki: direction): void {
        switch (muki) {
            case direction.right_angle:
                return car_RL_cycle(90, olca_RL.right);
            case direction.left_angle:
                return car_RL_cycle(90, olca_RL.left);
            case direction.diagonal_right:
                return car_RL_cycle(45, olca_RL.right);
            case direction.diagonal_left:
                return car_RL_cycle(45, olca_RL.left);
        }
    }



    //% color="#009A00" weight=40 blockId=polygon
    //% block="Run |%RorL|,|%digree_step| sides polygon,|%Edge_Num|cm length" group="3 Shape"
    export function polygon(RorL: olca_RL, digree_step: number, Edge_Num: number): void {
        switch (RorL) {
            case olca_RL.right:
                for (let index = 0; index < digree_step; index++) {
                    car_zengo(car_FB.forward, Edge_Num)
                    car_RL_cycle(360 / digree_step, olca_RL.right)
                }
                break;
            case olca_RL.left:
                for (let index = 0; index < digree_step; index++) {
                    car_zengo(car_FB.forward, Edge_Num)
                    car_RL_cycle(360 / digree_step, olca_RL.left)
                }
                break;
        }
    }


    //% color="#009A00" weight=39 blockId=cycle
    //% block="circlate |%RorL|,dia.|%D_Num|cm" group="3 Shape"
    export function cycle(RorL: olca_RL, D_Num: number): void {
        let cir = D_Num * 3.14
        let forward_D = cir / 30
        switch (RorL) {
            case olca_RL.right:
                for (let index = 0; index < 30; index++) {
                    car_zengo(car_FB.forward, forward_D)
                    car_RL_cycle(360 / 30, olca_RL.right)
                }
                break;
            case olca_RL.left:
                for (let index = 0; index < 30; index++) {
                    car_zengo(car_FB.forward, forward_D)
                    car_RL_cycle(360 / 30, olca_RL.left)
                }

        }
    }

    //% color="#ff3d03" weight=34 blockId=olca_speed block="motion speed slow|%olcaspeed|fast" group="4 Default setting"
    //% olcaspeed.min=-2000 olcaspeed.max=40
    export function olca_speed(olcaspeed: number): void {
        microbit_wait = microbit_wait * (100 - olcaspeed) / 100
    }

    //% color="#ff3d03" weight=35 blockId=auto_led_off block="micro:bit LED |%Matrix_LED|" group="4 Default setting"
    export function auto_led_off(Matrix_LED: microbit_LED) {
        switch (Matrix_LED) {
            case microbit_LED.disable:
                led.enable(false);
                break;
            case microbit_LED.activate:
                led.enable(true);
        }
    }
    //% color="#ffa800" weight=20 blockId=olca_Distance
    //% block="Travel distance adjustment(1/1000) shorter|%Dis|longer" group="5 Fine control"
    //% Dis.min=-20 Dis.max=20
    export function olca_Distance(Dis: number): void {
        cond_Distance = (1 + Dis / 1000);
    }

    //% color="#ffa800" weight=18 blockId=olca_degree
    //% block="Rotation angle adjustment(1/1000) Less|%Deg|more" group="5 Fine control"
    //% Deg.min=-20 Deg.max=20
    export function olca_degree(Deg: number): void {
        cond_degree = (1 + Deg / 1000);
    }

    //% color="#3943c6" weight=55 blockId=car_R_step
    //% block="Right_wheel move |%direction| |%R_step|steps" group="5 Fine control"

    export function car_R_step(direction: car_FB, R_step: number): void {
        moter_number = R_step;
        switch (direction) {
            case car_FB.forward:
                moter(R_step / 4, 1, 0);
                return;
            case car_FB.backward:
                moter(R_step / 4, 2, 0);
                return;
        }
    }
    //% color="#3943c6" weight=58 blockId=car_L_step
    //% block="Left wheel move |%direction| |%L_step|steps" group="5 Fine control"
    export function car_L_step(direction: car_FB, L_step: number): void {
        moter_number = L_step;
        switch (direction) {
            case car_FB.forward:
                moter(L_step / 4, 0, 1);
                return;
            case car_FB.backward:
                moter(L_step / 4, 0, 2);
                return;
        }
    }





    //% color="#009A00" weight=22 blockId=sonar_ping_2 block="Distance sensor" group="6 Ultrasonic_Distance sensor"
    //% advanced=true
    export function sonar_ping_2(): number {
        let d1 = 0;
        let d2 = 0;

        for (let i = 0; i < 5; i++) {
            // send
            basic.pause(5);
            pins.setPull(DigitalPin.P2, PinPullMode.PullNone);
            pins.digitalWritePin(DigitalPin.P2, 0);
            control.waitMicros(2);
            pins.digitalWritePin(DigitalPin.P2, 1);
            control.waitMicros(10);
            pins.digitalWritePin(DigitalPin.P2, 0);
            // read
            d1 = pins.pulseIn(DigitalPin.P0, PulseValue.High, 500 * 58);
            d2 = d2 + d1;
        }
        return Math.round(Math.idiv(d2 / 5, 58) * 1.5);
    }

    //% color="#009A00" weight=30 block="(minimam 5cm) dstance |%limit| cm  |%nagasa| " group="6 Ultrasonic_Distance sensor"
    //% limit.min=5 limit.max=30 limit.defl=5
    //% advanced=true
    export function sonar_ping_3(limit: number, nagasa: kyori): boolean {
        let d1 = 0;
        let d2 = 0;
        if (limit < 8) {
            limit = 8
        }
        for (let i = 0; i < 5; i++) {
            // send
            basic.pause(5);
            pins.setPull(DigitalPin.P2, PinPullMode.PullNone);
            pins.digitalWritePin(DigitalPin.P2, 0);
            control.waitMicros(2);
            pins.digitalWritePin(DigitalPin.P2, 1);
            control.waitMicros(10);
            pins.digitalWritePin(DigitalPin.P2, 0);
            // read
            d1 = pins.pulseIn(DigitalPin.P0, PulseValue.High, 500 * 58);
            d2 = d1 + d2;
        }
        switch (nagasa) {
            case kyori.short:
                if (Math.idiv(d2 / 5, 58) * 1.5 < limit) {
                    return true;
                } else {
                    return false;
                }
                break;
            case kyori.long:
                if (Math.idiv(d2 / 5, 58) * 1.5 < limit) {
                    return false;
                } else {
                    return true;
                }
                break;
        }
    }


    //% color="#f071bd" weight=30 blockId=auto_photo_R block="right_photoreflector" group="7 photoreflector"
    //% advanced=true
    export function phto_R() {
        return Math.round((pins.analogReadPin(AnalogPin.P10) / 1023) * 100);
    }

    //% color="#f071bd" weight=28 blockId=auto_photo_L block="left_photoreflector" group="7 photoreflector"
    //% advanced=true
    export function phto_L() {
        return Math.round((pins.analogReadPin(AnalogPin.P1) / 1023) * 100);
    }

    //% color="#d4b41f"  weight=26 block="right_photoreflector |%limit_R| small" group="7 photoreflector"
    //% limit_R.min=0 limit_R.max=100
    //% advanced=true
    export function photo_R(limit_R: number): boolean {
        if (phto_R() <= limit_R) {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (phto_L() <= limit_R) {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        io_neo.show()
        if ((pins.analogReadPin(AnalogPin.P10) / 1023) * 100 < limit_R) {
            return true;
        } else {
            return false;
        }
    }

    //% color="#d4b41f"  weight=27 block="left_photoreflector |%limit_L| small" group="7 photoreflector"
    //% limit_L.min=0 limit_L.max=100
    //% advanced=true
    export function photo_L(limit_L: number): boolean {
        if (phto_R() <= limit_L) {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (phto_L() <= limit_L) {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        io_neo.show()
        if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < limit_L) {
            return true;
        } else {
            return false;
        }
    }

    //% color="#6041f1"  weight=33 block="only right |%wb| stepping on  |%sikii| " group="7 photoreflector"
    //% sikii.min=10 sikii.max=90 sikii.defl=50
    //% advanced=true
    export function photo_R_out(wb: whiteblack, sikii: number): boolean {
        if (phto_R() <= sikii) {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (phto_L() <= sikii) {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        io_neo.show()
        switch (wb) {
            case whiteblack.black:
                if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 > sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 < sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
            case whiteblack.white:
                if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 > sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
        }
    }

    //% color="#6041f1"  weight=34 block="onle left |%wb| stepping on threshold |%sikii| " group="7 photoreflector" 
    //% sikii.min=10 sikii.max=90 sikii.defl=50
    //% advanced=true
    export function photo_L_out(wb: whiteblack, sikii: number): boolean {
        if (phto_R() <= sikii) {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (phto_L() <= sikii) {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        io_neo.show()
        switch (wb) {
            case whiteblack.black:
                if (

                    (pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 > sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
            case whiteblack.white:
                if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 > sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 < sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
        }
    }
    //% color="#6041f1"  weight=35 block="Both |%wb| stepping on threshold |%sikii| " group="7 photoreflector"
    //% sikii.min=10 sikii.max=90 sikii.defl=50
    //% advanced=true
    export function photo_LR_out(wb: whiteblack, sikii: number): boolean {
        if (phto_R() <= sikii) {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (phto_L() <= sikii) {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        io_neo.show()
        switch (wb) {
            case whiteblack.black:
                if (
                    (pins.analogReadPin(AnalogPin.P1) / 1023) * 100 <= sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 <= sikii) {
                    return true;
                } else {
                    return false;
                }
                break;

            case whiteblack.white:

                if (
                    (pins.analogReadPin(AnalogPin.P1) / 1023) * 100 >= sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 >= sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
        }

    }

    //% color="#009A00"  weight=19 blockId=microbit2_decideLight block="m:bitOptical sensor value |%limit| Darker" group="8 microbit Optical_sensor"
    //% limit.min=0 limit.max=100 
    //% advanced=true
    export function microbit2_decideLight(limit: number): boolean {
        if (input.lightLevel() / 254 * 100 < limit) {
            return true;
        } else {
            return false;
        }
    }



    //% color="#009A00"  weight=17 blockId=microbit2_denkitemp block="m:bitOptical sensor value" group="8 microbit Optical_sensor"
    //% advanced=true
    export function microbit2_denkitemp(): number {

        return Math.round(input.lightLevel() / 254 * 100);

    }

    /*
        //% color="#228b22"  weight=16 blockId=microbit2_denkiLED block="m:bit Optical sensor value" group="9 microbit Optical_sensor"
        //% advanced=true
        export function microbit2_denkiLED() {
            basic.showNumber(Math.round(input.lightLevel() / 254 * 100));
        }
    */

    //% color="#696969" weight=58 blockId=IO_relay block="Relay (digital) write|%mode|" group="9 Relay control"
    //% advanced=true
    export function IO_relay(mode: onoff) {
        switch (mode) {
            case onoff.ON:
                return pins.digitalWritePin(DigitalPin.P2, 1);

            case onoff.OFF:
                return pins.digitalWritePin(DigitalPin.P2, 0);
        }
    }



    //% color="#696969" weight=56 blockId=IO_relay_2 block="Relay (analog) write|%syuturyoku|" group="9 Relay control"
    //% syuturyoku.min=0 syuturyoku.max=1023
    //% advanced=true
    export function IO_relay_2(syuturyoku: number) {
        return pins.analogWritePin(AnalogPin.P2, syuturyoku);
    }


}



//% color="#ff4500" weight=94 block="olca_LED"

namespace carLED_blocks {

    export enum led_direction {
        //% block="Straight"
        Straight,
        //% block="Backward"
        Backward,
        //% block="Right"
        Right,
        //% block="Left"
        Left,
        //% block="Stop"
        Stop
    }



    //% color.shadow="colorNumberPicker"
    //% color="#20b2aa" weight=82 blockId=neopixel_select block="FullcolorLED color $color " group="olcaLED"
    export function neopixel_select_block(color: number) {
        io_neo.showColor(color)
    }



    //% color="#9400d3" weight=81 blockId=neopixel_reinbow block="reinbow" group="olcaLED"
    export function neopixel_rainbow() {
        io_neo.showRainbow(1, 180)
    }




    //% color="#cd853f" weight=80 blockId=neopixel_erace block="FullcolorLED All_Erease" group="olcaLED"
    export function neopixel_erace_block() {
        for (let n = 0; n < 25; n++) {
            io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Black))
        }
        io_neo.show()

    }

    //% color="#1E90FF" weight=83 block="wait_time(sec)|%second|" group="olcaLED"
    //% second.min=0 second.max=10 
    export function driveForwards(second: number): void {
        basic.pause(second * 1000);
    }

    function extractBits(num: number, n: number, m: number) {
        return (((1 << (m - n + 1)) - 1) & (num >> (n - 1)))
    }


    //% color.shadow="colorNumberPicker"
    //% color="#20b2aa" weight=82 blockID=neopixel_font block="Icon|%n_font| color $color" group="olcaLED"
    export function neopixel_font_block(n_font: led_direction, color: number) {
        let num = 0
        switch (n_font) {
            case led_direction.Backward:
                num = 4291652
                break;
            case led_direction.Straight:
                num = 4488452
                break;
            case led_direction.Right:
                num = 4674692
                break;
            case led_direction.Left:
                num = 4347332
                break;
            case led_direction.Stop:
                num = 9229922
                break;
        }
        neo_disp(num, color)
    }


    //% color="#696969" weight=82 blockId=neopixel_Brightness block="Color LED(s) Brightness|%Brightness| " group="olcaLED"
    //% Brightness.min=0 Brightness.max=255 Brightness.defl=15
    export function neopixel_Brightness_block(Brightness: number) {
        io_neo.setBrightness(Brightness)
    }


    //% color.shadow="colorNumberPicker"
    //% color="#20b2aa" weight=82 blockId=neopixel_set block="Make No.|%neo_number|glow $color" group="olcaLED"
    //% neo_number.min=0 neo_number.max=24
    export function neopixel_set_block(neo_number: number, color: number) {
        io_neo.setPixelColor(neo_number, color)
        io_neo.show()
    }

    function neo_disp(num: number, color: number) {
        neopixel_erace_block()
        basic.pause(100)

        for (let step = 24; step >= 0; step--) {
            if (extractBits(num, step + 1, step + 1)) {
                io_neo.setPixelColor(24 - step, color)
            }
            else {
                io_neo.setPixelColor(24 - step, neopixel.colors(NeoPixelColors.Black))
            }

            io_neo.show()
        }
    }


    function neopixel_char(char: string, color: number) {
        let num = 0
        switch (char) {
            case "a":
                num = 32118430
                break;
            case "b":
                num = 33216170
                break;
            case "c":
                num = 15255082
                break;
            case "d":
                num = 33080878
                break;
            case "e":
                num = 33216181
                break;
            case "f":
                num = 33166981
                break;
            case "g":
                num = 15259325
                break;
            case "h":
                num = 32641183
                break;
            case "i":
                num = 589344
                break;
            case "j":
                num = 8961536
                break;
            case "k":
                num = 1020241
                break;
            case "l":
                num = 1032240
                break;
            case "m":
                num = 32772383
                break;
            case "n":
                num = 32772191
                break;
            case "o":
                num = 15255086
                break;
            case "p":
                num = 33166978
                break;
            case "q":
                num = 15259222
                break;
            case "r":
                num = 33167058
                break;
            case "s":
                num = 24827581
                break;
            case "t":
                num = 1605121
                break;
            case "u":
                num = 15777839
                break;
            case "v":
                num = 3358915
                break;
            case "w":
                num = 15775791
                break;
            case "x":
                num = 18157905
                break;
            case "y":
                num = 1339649
                break;
            case "z":
                num = 18470705
                break;
            case " ":
                num = 0
                break;
        }
        neo_disp(num, color)

    }

    //% color.shadow="colorNumberPicker"
    //% color="#20b2aa" weight=82 blockId=show_string block="show string |%s| color $color" group="olcaLED"
    //% s.defl=""
    export function show_string(s: string, color: number) {

        for (let step = 0; step < s.length; step++) {
            neopixel_char(s.substr(step, 1), color)
            basic.pause(1000)
        }
    }
}
