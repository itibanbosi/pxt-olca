/* Orca Ver1.0*/

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

let Stepping_non = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];
let Stepping1 = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];
let SteppingF_0 = [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
];
let SteppingF_1 = [
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 1],
];
let SteppingF_2 = [
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
];
let SteppingF_3 = [
    [1, 0, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
];

let SteppingB_0 = [
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
];
let SteppingB_1 = [

    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
];

let SteppingB_2 = [
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 1],
];
let SteppingB_3 = [

    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
];

let Stepping_R = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

let Stepping_L = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

let font_B = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
];

let font_F = [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
];

let font_R = [
    [0, 1, 1, 0, 0],
    [1, 0, 1, 1, 0],
    [0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
];

let font_L = [
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
];




//LED不使用
led.enable(false)

pins.digitalWritePin(DigitalPin.P3, 0)
pins.digitalWritePin(DigitalPin.P4, 0)
pins.digitalWritePin(DigitalPin.P6, 0)
pins.digitalWritePin(DigitalPin.P7, 0)
pins.digitalWritePin(DigitalPin.P13, 0)
pins.digitalWritePin(DigitalPin.P14, 0)
pins.digitalWritePin(DigitalPin.P15, 0)
pins.digitalWritePin(DigitalPin.P16, 0)

let moter_number = 0;
let olca_neo = neopixel.create(DigitalPin.P9, 25, NeoPixelMode.RGB);
//io_neo.showRainbow(1,360)
pins.servoWritePin(AnalogPin.P8, 90);
basic.pause(1000);
pins.digitalWritePin(DigitalPin.P8, 0)
//バージョンの判定
let first = input.runningTimeMicros()
let sum = 0
for (let index = 0; index < 1000; index++) {
    sum += 1
}
//basic.showNumber(input.runningTimeMicros() - first);
if ((input.runningTimeMicros() - first) < 2000) {
    microbit_wait = 5000;
    //    basic.showString("V2");

}
else {
    microbit_wait = 900;
    //    basic.showString("V1");
}

basic.forever(function () {
    let moving = 0
    serial.writeLine("" + (moving))
    if (moving == 0) {
        olca_plot_car.plot_zengo(olca_plot_car.plotter_houkou.forward, 0)
    }
    if (moving == 1) {
        olca_plot_car.plot_zengo(olca_plot_car.plotter_houkou.forward, 1)
    }
    if (moving == 2) {
        olca_plot_car.plot_zengo(olca_plot_car.plotter_houkou.backward, 1)
    }
    if (moving == 3) {
        olca_plot_car.plot_RL_cycle(olca_plot_car.plotter_RL.Right, 1)
    }
    if (moving == 4) {
        olca_plot_car.plot_RL_cycle(olca_plot_car.plotter_RL.left, 1)
    }
})



//% color="#3943c6" block="Olca Ver1.0" weight=95 icon="\uf1b9"
namespace olca_plot_car {



    export enum pen_updown {
        //% block="down"
        down,
        //% block="up"
        up
    }

    export enum plotter_houkou {
        //% block="forward"
        forward,
        //% block="back"
        backward
    }

    export enum plotter_RL {
        //% block="right"
        Right,
        //% block="left"
        left
    }


    export enum microbit_LED {
        //% block="disable"
        disable,
        //% block="activate"
        activate
    }

    export enum houkou {
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
        //% block="normal_room"
        normal_room,
        //% block="light_room"
        light_room,
        //% block="dark_room",
        dark_room
    }
    export enum microbit_version {
        //% block="Version1"
        Version1,
        //% block="Version2"
        Version2,
        //% block="Test_A"
        Test_A,
        //% block="Test_B"
        Test_B,
        //% block="V1_Turbo"
        V1_Turbo,
        //% block="V2_Turbo"
        V2_Turbo
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

    basic.forever(function () {
        let moving = 0
        serial.writeLine("" + (moving))
        if (moving == 0) {
            olca_plot_car.plot_zengo(olca_plot_car.plotter_houkou.forward, 0)
        }
        if (moving == 1) {
            olca_plot_car.plot_zengo(olca_plot_car.plotter_houkou.forward, 1)
        }
        if (moving == 2) {
            olca_plot_car.plot_zengo(olca_plot_car.plotter_houkou.backward, 1)
        }
        if (moving == 3) {
            olca_plot_car.plot_RL_cycle(olca_plot_car.plotter_RL.Right, 1)
        }
        if (moving == 4) {
            olca_plot_car.plot_RL_cycle(olca_plot_car.plotter_RL.left, 1)
        }
    })



    function moter(kyori: number, R_zengo: number, L_zengo: number) {
        led.enable(false);
        let i = 0;
        /* 端数の計算計算  */

        let kyori_hasuu = kyori % 1;
        /*serial.writeValue("kyori_hasuu", kyori_hasuu);*/
        let kyori_seisuu = Math.floor(kyori);
        /*    serial.writeValue("kyori_seisuu", kyori_seisuu);*/


        /* forward回の動作との比較と処理  */
        /*serial.writeValue("1Tugi_L", Tugi_L);*/
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
                if (Tugi_R == 0) {
                    Stepping_R = SteppingF_0
                }
                break;
            case 1:

                if (Tugi_R == 0) {
                    Stepping_R = SteppingB_0
                }
                if (Tugi_R == 1) {
                    Stepping_R = SteppingB_1
                }
                if (Tugi_R == 2) {
                    Stepping_R = SteppingB_2
                }
                if (Tugi_R == 3) {
                    Stepping_R = SteppingB_3
                }
                break;
            case 2:
                if (Tugi_R == 0) {
                    Stepping_R = SteppingF_0
                }
                if (Tugi_R == 1) {
                    Stepping_R = SteppingF_1
                }
                if (Tugi_R == 2) {
                    Stepping_R = SteppingF_2
                }
                if (Tugi_R == 3) {
                    Stepping_R = SteppingF_3
                }
                break;

        }
        Stepping_L = SteppingF_0
        /*左ステッピングの処理*/
        switch (L_zengo) {
            case 0:
                Stepping_L = Stepping_non;
                break;
            case 1:
                if (Tugi_L == 0) {
                    Stepping_L = SteppingF_0
                }
                if (Tugi_L == 1) {
                    Stepping_L = SteppingF_1
                }
                if (Tugi_L == 2) {
                    Stepping_L = SteppingF_2
                }
                if (Tugi_L == 3) {
                    Stepping_L = SteppingF_3
                }
                break;
            case 2:
                if (Tugi_L == 0) {
                    Stepping_L = SteppingB_0
                }
                if (Tugi_L == 1) {
                    Stepping_L = SteppingB_1
                }
                if (Tugi_L == 2) {
                    Stepping_L = SteppingB_2
                }
                if (Tugi_L == 3) {
                    Stepping_L = SteppingB_3
                }
                break;
        }

        /*  バックラッシュの処理　Right_wheel*/
        if (PremotionR != R_zengo) {
            music.playTone(523, music.beat(BeatFraction.Sixteenth))
            for (let index = 0; index < 3; index++) {
                let Data1 = 0;
                while (Data1 < 4) {
                    pins.digitalWritePin(DigitalPin.P3, Stepping_R[Data1][0]);
                    pins.digitalWritePin(DigitalPin.P4, Stepping_R[Data1][1]);
                    pins.digitalWritePin(DigitalPin.P6, Stepping_R[Data1][2]);
                    pins.digitalWritePin(DigitalPin.P7, Stepping_R[Data1][3]);
                    Data1 = Data1 + 1;
                    for (i = 0; i < microbit_wait; i++);
                    {
                    }
                }
            }
        }


        /*  バックラッシュの処理　left_wheel*/
        if (PremotionL != L_zengo) {
            music.playTone(523, music.beat(BeatFraction.Sixteenth))
            for (let index = 0; index < 3; index++) {
                let Data1 = 0;
                while (Data1 < 4) {
                    pins.digitalWritePin(DigitalPin.P13, Stepping_L[Data1][0]);
                    pins.digitalWritePin(DigitalPin.P14, Stepping_L[Data1][1]);
                    pins.digitalWritePin(DigitalPin.P15, Stepping_L[Data1][2]);
                    pins.digitalWritePin(DigitalPin.P16, Stepping_L[Data1][3]);
                    Data1 = Data1 + 1;
                    for (i = 0; i < microbit_wait; i++);
                    {
                    }
                }
            }
        }


        /*  整数部の処理　 */
        for (let index = 0; index < kyori_seisuu; index++) {
            let Data1 = 0;
            while (Data1 < 4) {

                pins.digitalWritePin(DigitalPin.P3, Stepping_R[Data1][0]);
                pins.digitalWritePin(DigitalPin.P13, Stepping_L[Data1][0]);
                pins.digitalWritePin(DigitalPin.P4, Stepping_R[Data1][1]);
                pins.digitalWritePin(DigitalPin.P14, Stepping_L[Data1][1]);
                pins.digitalWritePin(DigitalPin.P6, Stepping_R[Data1][2]);
                pins.digitalWritePin(DigitalPin.P15, Stepping_L[Data1][2]);
                pins.digitalWritePin(DigitalPin.P7, Stepping_R[Data1][3]);
                pins.digitalWritePin(DigitalPin.P16, Stepping_L[Data1][3]);
                Data1 = Data1 + 1;
                for (i = 0; i < microbit_wait; i++);
                {
                }
            }
        }

        /* 端数分の進み方と処理  */
        let Step_number = Math.floor(kyori_hasuu * 10 / 2.5);
        let Data1 = 0;
        while (Data1 < Step_number) {
            /*serial.writeValue("Data1", Data1);*/
            pins.digitalWritePin(DigitalPin.P3, Stepping_R[Data1][0]);
            pins.digitalWritePin(DigitalPin.P13, Stepping_L[Data1][0]);
            pins.digitalWritePin(DigitalPin.P4, Stepping_R[Data1][1]);
            pins.digitalWritePin(DigitalPin.P14, Stepping_L[Data1][1]);
            pins.digitalWritePin(DigitalPin.P6, Stepping_R[Data1][2]);
            pins.digitalWritePin(DigitalPin.P15, Stepping_L[Data1][2]);
            pins.digitalWritePin(DigitalPin.P7, Stepping_R[Data1][3]);
            pins.digitalWritePin(DigitalPin.P16, Stepping_L[Data1][3]);
            Data1 = Data1 + 1;
            for (i = 0; i < microbit_wait; i++);
            {
            }
        }

        Tugi_L = (Tugi_L + Data1 - 1) % 4;
        Tugi_R = (Tugi_R + Data1 - 1) % 4;

        PremotionR = R_zengo;
        PremotionL = L_zengo;

    }


    //% color="#009CA0" weight=96 blockId=olca_relay block="pen |%mode| " group="1 Control Pen"
    export function plot_pen(mode: pen_updown) {
        if (mode == pen_updown.down) {
            pins.servoWritePin(AnalogPin.P8, 45);
            basic.pause(1000);
            pins.digitalWritePin(DigitalPin.P8, 0)
        }
        if (mode == pen_updown.up) {
            pins.servoWritePin(AnalogPin.P8, 90);
            basic.pause(1000);
            pins.digitalWritePin(DigitalPin.P8, 0)
        }
    }


    //% color="#3943c6" weight=80 blockId=plot_zengo
    //% block="Move|%zengo| |%F_cm| cm" group="2 Basic control"
    export function plot_zengo(zengo: plotter_houkou, F_cm: number): void {
        switch (zengo) {
            case plotter_houkou.forward:
                moter_number = F_cm / (18.9 * cond_Distance) * 512;
                moter(moter_number, 1, 1);
                break;

            case plotter_houkou.backward:
                moter_number = F_cm / (18.9 * cond_Distance) * 512;
                moter(moter_number, 2, 2);
                break;
        }
    }

    //% color="#3943c6" weight=76 blockId=plot_RL_cycle
    //% block="Rotate |%L_degree| degrees to |%RorL|" group="2 Basic control"
    export function plot_RL_cycle(RorL: plotter_RL, RL_degree: number): void {
        switch (RorL) {
            case plotter_RL.left:
                moter_number = RL_degree / 360 * 512 * con_kaiten * cond_degree;
                moter(moter_number, 1, 2);
                break;
            case plotter_RL.Right:
                moter_number = RL_degree / 360 * 512 * con_kaiten * cond_degree;
                moter(moter_number, 2, 1);
                break;
        }
    }


    //% color="#ff4940" weight=71 blockId=plot_rest
    //% block="power off" group="2 Basic control"
    export function plot_frest(): void {
        moter_number = 1;
        moter(moter_number, 0, 1);
    }




    //% color="#3943c6" weight=72 blockId=plot_houkou
    //% block="Change direction to |%muki|   " group="2 Basic control"
    export function plot_houkou(muki: houkou): void {
        switch (muki) {
            case houkou.right_angle:
                return olca_plot_car.plot_RL_cycle(plotter_RL.Right, 90);
            case houkou.left_angle:
                return olca_plot_car.plot_RL_cycle(plotter_RL.left, 90);
            case houkou.diagonal_right:
                return olca_plot_car.plot_RL_cycle(plotter_RL.Right, 45);
            case houkou.diagonal_left:
                return olca_plot_car.plot_RL_cycle(plotter_RL.left, 45);
        }
    }



    //% color="#009A00" weight=40 blockId=polygon
    //% block="Run |%RorL|,|%digree_step|sides polygon,|%Edge_Num| cm length" group="3 shapes"
    export function polygon(RorL: plotter_RL, digree_step: number, Edge_Num: number): void {
        switch (RorL) {
            case plotter_RL.Right:
                for (let index = 0; index < digree_step; index++) {
                    olca_plot_car.plot_zengo(plotter_houkou.forward, Edge_Num)
                    olca_plot_car.plot_RL_cycle(plotter_RL.Right, 360 / digree_step)
                }
                break;
            case plotter_RL.left:
                for (let index = 0; index < digree_step; index++) {
                    olca_plot_car.plot_zengo(plotter_houkou.forward, Edge_Num)
                    olca_plot_car.plot_RL_cycle(plotter_RL.left, 360 / digree_step)
                }
                break;
        }
    }


    //% color="#009A00" weight=39 blockId=cycle
    //% block="Circulate |%RorL|,dia.|%D_Num|cm" group="3 shapes"
    export function cycle(RorL: plotter_RL, D_Num: number): void {
        let cir = D_Num * 3.14
        let forward_D = cir / 30
        switch (RorL) {
            case plotter_RL.Right:
                for (let index = 0; index < 30; index++) {
                    olca_plot_car.plot_zengo(plotter_houkou.forward, forward_D)
                    olca_plot_car.plot_RL_cycle(plotter_RL.Right, 360 / 30)
                }
                break;
            case plotter_RL.left:
                for (let index = 0; index < 30; index++) {
                    olca_plot_car.plot_zengo(plotter_houkou.forward, forward_D)
                    olca_plot_car.plot_RL_cycle(plotter_RL.left, 360 / 30)
                }

        }
    }



    //% color="#ff3d03" weight=34 blockId=Microbit_Version_info block="micro:bit_Version |%Version_info|" group="4 Default setting"
    export function microbit_version_info(Version_info: microbit_version) {
        switch (Version_info) {
            case microbit_version.Version1:
                microbit_wait = 900;
                break;
            case microbit_version.Version2:
                microbit_wait = 5000;
                break;
            case microbit_version.Test_A:
                microbit_wait = 10000;
                break;
            case microbit_version.Test_B:
                microbit_wait = 90000;
                break;
            case microbit_version.V1_Turbo:
                microbit_wait = 600;
                break;
            case microbit_version.V2_Turbo:
                microbit_wait = 2500;
                break;


        }
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






    //% color="#ffa800" weight=20 blockId=plotter_Distance
    //% block="Travel distance adjustment(1/1000) [shorter|%Dis|longer]" group="5 Fine control"
    //% Dis.min=-30 Dis.max=30
    export function plotter_Distance(Dis: number): void {
        cond_Distance = (1 + Dis / 1000);
    }

    //% color="#ffa800" weight=18 blockId=plotter_degree
    //% block="Rotation angle adjustment [Less|%Deg|more]" group="5 Fine control"
    //% Deg.min=-30 Deg.max=30
    export function plotter_degree(Deg: number): void {
        cond_degree = (1 + Deg / 1000);
    }

    //% color="#3943c6" weight=55 blockId=plot_R_step
    //% block="Right_wheel |%houkou| move |%R_step|" group="5 Fine control"

    export function plot_R_step(R_step: number, houkou: plotter_houkou): void {
        moter_number = R_step;
        switch (houkou) {
            case plotter_houkou.forward:
                moter(R_step / 4, 1, 0);
                return;
            case plotter_houkou.backward:
                moter(R_step / 4, 2, 0);
                return;
        }
    }
    //% color="#3943c6" weight=58 blockId=plot_L_step
    //% block="Left_wheel move |%houkou| step |%L_step|" group="5 Fine control"
    export function plot_L_step(L_step: number, houkou: plotter_houkou): void {
        moter_number = L_step;
        switch (houkou) {
            case plotter_houkou.forward:
                moter(L_step / 4, 0, 1);
                return;
            case plotter_houkou.backward:
                moter(L_step / 4, 0, 2);
                return;
        }
    }





    //% color="#009A00" weight=22 blockId=sonar_ping_2 block="Distance sensor" group="6 Distance sensor(ultrasonic)"
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

    //% color="#009A00" weight=30 block="(minimam 5cm) Dstance |%limit|  than |%nagasa| cm" group="6 Distance sensor(ultrasonic)"
    //% limit.min=5 limit.max=30
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


    //% color="#f071bd" weight=30 blockId=auto_photo_R block="Right_photoreflector" group="7 photoreflectors"
    //% advanced=true
    export function phto_R() {
        return Math.round((pins.analogReadPin(AnalogPin.P10) / 1023) * 100);
    }

    //% color="#f071bd" weight=28 blockId=auto_photo_L block="left_photoreflector" group="7 photoreflectors"
    //% advanced=true
    export function phto_L() {
        return Math.round((pins.analogReadPin(AnalogPin.P1) / 1023) * 100);
    }

    //% color="#d4b41f"  weight=26 block="Right_photoreflector value,less than|%limit_R|" group="7 photoreflectors"
    //% limit_R.min=0 limit_R.max=100
    //% advanced=true
    export function photo_R(limit_R: number): boolean {
        if (olca_plot_car.phto_R() <= limit_R) {
            //            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            //            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (olca_plot_car.phto_L() <= limit_R) {
            //            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            //            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        //        io_neo.show()
        if ((pins.analogReadPin(AnalogPin.P10) / 1023) * 100 < limit_R) {
            return true;
        } else {
            return false;
        }
    }

    //% color="#d4b41f"  weight=27 block="Left_photoreflector value,less than |%limit_L|" group="7 photoreflectors"
    //% limit_L.min=0 limit_L.max=100
    //% advanced=true
    export function photo_L(limit_L: number): boolean {
        if (olca_plot_car.phto_R() <= limit_L) {
            //            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            //            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (olca_plot_car.phto_L() <= limit_L) {
            //            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            //            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        //        io_neo.show()
        if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < limit_L) {
            return true;
        } else {
            return false;
        }
    }

    //% color="#6041f1"  weight=33 block="Only right sensor over |%wb|,sensitivity level  |%sikii| " group="7 photoreflectors"
    //% sence.min=10 sence.max=40
    //% advanced=true
    export function photo_R_out(wb: whiteblack, sikii: sence_select): boolean {
        if (sikii == sence_select.light_room) {
            sikii = 60;
        }
        if (sikii == sence_select.normal_room) {
            sikii = 50;
        }
        if (sikii == sence_select.dark_room) {
            sikii = 40;
        }
        if (olca_plot_car.phto_R() <= sikii) {
            //            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            //            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (olca_plot_car.phto_L() <= sikii) {
            //            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            //            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        //        io_neo.show()
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

    //% color="#6041f1"  weight=34 block="Only left sensor over |%wb|,sensitivity level |%sikii| " group="7 photoreflectors" 
    //% advanced=true
    export function photo_L_out(wb: whiteblack, sikii: sence_select): boolean {
        if (sikii == sence_select.light_room) {
            sikii = 60;
        }
        if (sikii == sence_select.normal_room) {
            sikii = 50;
        }
        if (sikii == sence_select.dark_room) {
            sikii = 40;
        }
        if (olca_plot_car.phto_R() <= sikii) {
            //            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            //            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (olca_plot_car.phto_L() <= sikii) {
            //            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            //            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        //        io_neo.show()
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
    //% color="#6041f1"  weight=35 block="Both over |%wb|,sensitivity level|%sikii| " group="7 photoreflectors"
    //% advanced=true
    export function photo_LR_out(wb: whiteblack, sikii: sence_select): boolean {
        if (sikii == sence_select.light_room) {
            sikii = 60;
        }
        if (sikii == sence_select.normal_room) {
            sikii = 50;
        }
        if (sikii == sence_select.dark_room) {
            sikii = 40;
        }
        if (olca_plot_car.phto_R() <= sikii) {
            //            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            //            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (olca_plot_car.phto_L() <= sikii) {
            //            olca_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            //            olca_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        //        olca_neo.show()
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

    //% color="#009A00"  weight=19 blockId=microbit2_decideLight block="micro:bit light sensor value darker than |%limit|" group="8 microbit light_sensor"
    //% limit.min=0 limit.max=100
    //% advanced=true
    export function microbit2_decideLight(limit: number): boolean {
        if (input.lightLevel() / 254 * 100 < limit) {
            return true;
        } else {
            return false;
        }
    }



    //% color="#009A00"  weight=17 blockId=microbit2_denkitemp block="micro:bit light sensor values" group="8 microbit light_sensor"
    //% advanced=true
    export function microbit2_denkitemp(): number {

        return Math.round(input.lightLevel() / 254 * 100);

    }
}

//% color="#ff4500" weight=94 block="Olca_LED"






namespace plotLED_blocks {
    export enum led_houkou {
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



    export enum neoLED_color {
        //% block="white"
        white,
        //% block="red"
        red,
        //% block="yellow"
        yellow,
        //% block="green"
        green,
        //% block="blue"
        blue,
        //% block="orange"
        orange,
        //% block="indigo"
        indigo,
        //% block="violet"
        violet,
        //% block="purple"
        purple,
        //% block="black"
        black
    }




    //% color="#20b2aa" weight=82 blockId=neopixel_select block="Color LED(s),|%neo_color| " group="PlotcarLED"
    export function neopixel_select_block(neo_color: neoLED_color) {

        switch (neo_color) {
            case neoLED_color.red:
                olca_neo.showColor(neopixel.colors(NeoPixelColors.Red))
                break;
            case neoLED_color.orange:
                olca_neo.showColor(neopixel.colors(NeoPixelColors.Orange))
                break;
            case neoLED_color.yellow:
                olca_neo.showColor(neopixel.colors(NeoPixelColors.Yellow))
                break;
            case neoLED_color.green:

                olca_neo.showColor(neopixel.colors(NeoPixelColors.Green))
                break;
            case neoLED_color.blue:
                olca_neo.showColor(neopixel.colors(NeoPixelColors.Blue))
                break;
            case neoLED_color.indigo:
                olca_neo.showColor(neopixel.colors(NeoPixelColors.Indigo))
                break;
            case neoLED_color.violet:
                olca_neo.showColor(neopixel.colors(NeoPixelColors.Violet))
                break;
            case neoLED_color.purple:
                olca_neo.showColor(neopixel.colors(NeoPixelColors.Purple))
                break;
            case neoLED_color.white:
                olca_neo.showColor(neopixel.colors(NeoPixelColors.White))
                break;
            case neoLED_color.black:
                olca_neo.showColor(neopixel.colors(NeoPixelColors.Black))
                break;
        }
    }

    //% color="#9400d3" weight=81 blockId=neopixel_reinbow block="Reinbow" group="PlotcarLED"
    export function neopixel_rainbow() {
        olca_neo.showRainbow(1, 180)
    }

    //% color="#cd853f" weight=80 blockId=neopixel_erace block="ColorLED(s),all off" group="PlotcarLED"
    export function neopixel_erace_block() {
        for (let n = 0; n < 4; n++) {
            olca_neo.showColor(neopixel.colors(NeoPixelColors.Black))
        }
    }

    //% color="#1E90FF" weight=83 block="wait_time(sec)|%second|" group="PlotcarLED"
    //% second.min=0 second.max=10
    export function driveForwards(second: number): void {
        basic.pause(second * 1000);
    }

    //% color="#20b2aa" weight=82 blockId=neopixel_font block="Icon|%n_font| " group="PlotcarLED"
    export function neopixel_font_block(n_font: led_houkou) {

        switch (n_font) {
            case led_houkou.Straight:
                olca_neo.showColor(neopixel.colors(NeoPixelColors.Black))
                olca_neo.setPixelColor(2, neopixel.colors(NeoPixelColors.Blue))
                olca_neo.setPixelColor(6, neopixel.colors(NeoPixelColors.Blue))

                olca_neo.setPixelColor(10, neopixel.colors(NeoPixelColors.Blue))
                olca_neo.setPixelColor(11, neopixel.colors(NeoPixelColors.Blue))
                olca_neo.setPixelColor(12, neopixel.colors(NeoPixelColors.Blue))
                olca_neo.setPixelColor(13, neopixel.colors(NeoPixelColors.Blue))
                olca_neo.setPixelColor(14, neopixel.colors(NeoPixelColors.Blue))
                olca_neo.setPixelColor(16, neopixel.colors(NeoPixelColors.Blue))
                olca_neo.setPixelColor(22, neopixel.colors(NeoPixelColors.Blue))

                olca_neo.show()
                break;
            case led_houkou.Backward:
                olca_neo.showColor(neopixel.colors(NeoPixelColors.Black))
                olca_neo.setPixelColor(2, neopixel.colors(NeoPixelColors.Purple))
                olca_neo.setPixelColor(8, neopixel.colors(NeoPixelColors.Purple))
                olca_neo.setPixelColor(10, neopixel.colors(NeoPixelColors.Purple))
                olca_neo.setPixelColor(11, neopixel.colors(NeoPixelColors.Purple))
                olca_neo.setPixelColor(12, neopixel.colors(NeoPixelColors.Purple))
                olca_neo.setPixelColor(13, neopixel.colors(NeoPixelColors.Purple))
                olca_neo.setPixelColor(14, neopixel.colors(NeoPixelColors.Purple))
                olca_neo.setPixelColor(18, neopixel.colors(NeoPixelColors.Purple))
                olca_neo.setPixelColor(22, neopixel.colors(NeoPixelColors.Purple))

                olca_neo.show()
                break;
            case led_houkou.Right:
                olca_neo.showColor(neopixel.colors(NeoPixelColors.Black))
                olca_neo.setPixelColor(2, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.setPixelColor(7, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.setPixelColor(12, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.setPixelColor(17, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.setPixelColor(22, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.setPixelColor(3, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.setPixelColor(5, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.setPixelColor(9, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.show()
                break;
            case led_houkou.Left:
                olca_neo.showColor(neopixel.colors(NeoPixelColors.Black))
                olca_neo.setPixelColor(2, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.setPixelColor(7, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.setPixelColor(12, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.setPixelColor(17, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.setPixelColor(22, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.setPixelColor(21, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.setPixelColor(23, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.setPixelColor(19, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.setPixelColor(15, neopixel.colors(NeoPixelColors.Yellow))
                olca_neo.show()
                break;
            case led_houkou.Stop:
                olca_neo.showColor(neopixel.colors(NeoPixelColors.Black))

                olca_neo.setPixelColor(6, neopixel.colors(NeoPixelColors.Red))
                olca_neo.setPixelColor(9, neopixel.colors(NeoPixelColors.Red))
                olca_neo.setPixelColor(10, neopixel.colors(NeoPixelColors.Red))
                olca_neo.setPixelColor(12, neopixel.colors(NeoPixelColors.Red))
                olca_neo.setPixelColor(14, neopixel.colors(NeoPixelColors.Red))
                olca_neo.setPixelColor(15, neopixel.colors(NeoPixelColors.Red))
                olca_neo.setPixelColor(18, neopixel.colors(NeoPixelColors.Red))

                olca_neo.show()
                break;

        }
    }


}
