import React, { useEffect, useCallback, useRef } from "react";
import { Input } from "webiny-ui/Input";
import { Grid, Cell } from "webiny-ui/Grid";
import { camelCase } from "lodash";
import { useFormEditor } from "webiny-app-forms/admin/components/FormEditor/Context";

const GeneralTab = ({ form: { Bind, setValue } }) => {
    const inputRef = useRef(null);
    const {
        getFields,
        getEditingField
    } = useFormEditor();

    const currentField = getEditingField();

    useEffect(() => {
        inputRef.current && inputRef.current.focus();
    }, []);

    const afterChangeLabel = useCallback(value => {
        setValue("fieldId", camelCase(value));
    }, []);

    const uniqueFieldIdValidator = useCallback(fieldId => {
        const existingField = getFields().find(field => field.fieldId === fieldId);
        if (!existingField) {
            return;
        }

        if (existingField.id !== currentField.id) {
            throw new Error("Please enter a unique ID");
        }
    });

    /*
    if (typeof fieldType.renderSettings === "function") {
        fieldType.renderSettings({ Bind, slugify, uniqueId });
    }*/

    return (
        <Grid>
            <Cell span={6}>
                <Bind name={"label"} validators={["required"]} afterChange={afterChangeLabel}>
                    <Input label={"Label"} inputRef={inputRef} />
                </Bind>
            </Cell>
            <Cell span={6}>
                <Bind name={"fieldId"} validators={["required", uniqueFieldIdValidator]}>
                    <Input label={"Field ID"} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={"helpText"}>
                    <Input label={"Help text"} description={"Help text (optional)"} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={"placeholderText"}>
                    <Input label={"Placeholder text"} description={"Placeholder text (optional)"} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={"defaultValue"}>
                    <Input label={"Default value"} description={"Default value (optional)"} />
                </Bind>
            </Cell>
        </Grid>
    );
};

export default GeneralTab;